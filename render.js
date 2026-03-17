// --- RENDER SCRIPT ---
// Version 8.8.1: Updated Amulet Guide display logic.

document.addEventListener('DOMContentLoaded', () => {
    // Check if tripData is loaded
    if (typeof tripData === 'undefined') {
        console.error("行程資料 (tripData) 未載入！請確認資料檔案是否正確。");
        document.getElementById('main-title').innerText = "錯誤：行程資料遺失";
        return;
    }

    // --- GLOBAL ELEMENTS ---
    const mainNav = document.getElementById('main-nav');
    const sections = document.querySelectorAll('.main-section');
    const overviewChartCtx = document.getElementById('overviewChart').getContext('2d');
    let overviewChartInstance = null;
    
    // --- INITIALIZATION ---
    function initializePage() {
        // Set page title
        document.title = tripData.meta.title;
        document.getElementById('main-title').innerText = tripData.meta.mainTitle;

        // Setup main navigation
        mainNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const sectionId = e.target.dataset.section;
                mainNav.querySelectorAll('button').forEach(btn => btn.classList.remove('main-nav-active'));
                e.target.classList.add('main-nav-active');
                sections.forEach(section => section.id === sectionId ? section.classList.remove('hidden') : section.classList.add('hidden'));
                window.scrollTo(0, 0); 
                
                // Lazy-load section content
                switch (sectionId) {
                    case 'overview': initOverview(); break;
                    case 'themed-guides': initThemedGuides(); break; // NEW
                    case 'awards': initAwards(); break;
                    case 'transport': initTransport(); break;
                    case 'daily': initDaily(); break;
                    case 'prep': initPrep(); break;
                }
            }
        });

        // Initial Load on first visit
        const firstNavButton = document.querySelector('#main-nav button[data-section="overview"]');
        if (firstNavButton) {
            firstNavButton.classList.add('main-nav-active');
            document.getElementById('overview').classList.remove('hidden');
            initOverview();
        }
    }

    // --- RENDER FUNCTIONS ---

    function initOverview() {
        // 1. Render Chart
        if (overviewChartInstance) overviewChartInstance.destroy();
        const labels = Object.keys(tripData.dailyData).map(key => `D${key.replace('day', '')}`);
        const activityData = Object.values(tripData.dailyData).map(d => {
            if (d.options) {
                // Use the first option for a representative activity time
                const firstOption = d.options[Object.keys(d.options)[0]];
                let totalStay = 0;
                if (firstOption && firstOption.timeline) {
                     firstOption.timeline.forEach(item => {
                        if (item.stay && typeof item.stay === 'string' && item.stay.includes('小時')) {
                            totalStay += parseFloat(item.stay.replace(/[^0-9.]/g, ''));
                        } else if (item.stay && typeof item.stay === 'string' && item.stay.includes('分鐘')) {
                            totalStay += parseFloat(item.stay.replace(/[^0-9.]/g, '')) / 60;
                        }
                    });
                }
                return totalStay || d.timeAnalysis.activity;
            }
            return d.timeAnalysis.activity;
        });
        const travelData = Object.values(tripData.dailyData).map(d => d.timeAnalysis.travel);
        
        overviewChartInstance = new Chart(overviewChartCtx, {
            type: 'bar',
            data: { labels, datasets: [ 
                { label: '活動時間 (h)', data: activityData, backgroundColor: 'rgba(54, 162, 235, 0.7)' }, 
                { label: '移動時間 (h)', data: travelData, backgroundColor: 'rgba(255, 99, 132, 0.7)' } 
            ] },
            options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true, title: { display: true, text: '小時' } } }, plugins: { tooltip: { callbacks: { label: (context) => `${context.dataset.label}: ${context.raw.toFixed(1)} 小時` } } } }
        });

        // 2. Render Seasonal Highlights (if data exists)
        const seasonalSection = document.getElementById('seasonal-section');
        if (tripData.seasonalData) {
            const seasonalGrid = document.getElementById('seasonal-highlights');
            seasonalGrid.innerHTML = Object.values(tripData.seasonalData).map(season => `
                <div class="seasonal-card ${season.theme_color} p-4 rounded-lg shadow-md">
                    <h4 class="font-bold text-lg mb-2 flex items-center">${season.icon} ${season.title}</h4>
                    <div class="space-y-3 text-sm">
                        <div>
                            <h5 class="font-semibold text-gray-700">季節活動</h5>
                            <ul class="list-disc list-inside text-gray-600">${season.highlights.map(item => `<li>${item}</li>`).join('')}</ul>
                        </div>
                        <div>
                            <h5 class="font-semibold text-gray-700">時令美食</h5>
                            <ul class="list-disc list-inside text-gray-600">${season.foods.map(item => `<li>${item}</li>`).join('')}</ul>
                        </div>
                    </div>
                </div>
            `).join('');
            seasonalSection.classList.remove('hidden');
        }

        // 3. Render Detailed Highlights (if data exists)
        const highlightsSection = document.getElementById('highlights-section');
        if (tripData.detailedHighlights && tripData.detailedHighlights.length > 0) {
            document.getElementById('highlights-description').innerText = `以下是本次行程中的 ${tripData.detailedHighlights.length} 個核心目標，融合了歷史人文、專家建議與美食人氣焦點。列表已按行程順序排列。點擊地圖連結即可導航。`;
            const highlightsGrid = document.getElementById('highlights-grid');
            highlightsGrid.innerHTML = tripData.detailedHighlights.map(item => `
                <div class="highlight-card bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-shadow hover:shadow-2xl">
                    <div class="md:grid md:grid-cols-3 gap-6">
                        <div class="md:col-span-1 border-b md:border-r md:border-b-0 pb-4 mb-4 md:pb-0 md:mb-0 md:pr-4">
                            <h3 class="text-2xl font-bold text-gray-800">${item.name}</h3>
                            <span class="inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full ${item.type === '景點' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}">${item.type}</span>
                            <div class="mt-4">
                                <a href="${item.mapUrl}" target="_blank" class="text-blue-500 hover:text-blue-700 font-medium flex items-center transition-colors">
                                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    Google 地圖導航
                                </a>
                            </div>
                            <div class="mt-4 space-y-2 text-sm">
                                ${item.ticketInfo ? `
                                <p class="font-semibold flex items-center text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h4a1 1 0 100-2H7z" clip-rule="evenodd" />
                                    </svg>
                                    <span>門票: ${item.ticketInfo}</span>
                                </p>` : ''}
                                ${item.parkingInfo ? `
                                <p class="font-semibold flex items-start text-gray-700">
                                    <span class="text-lg mr-1 leading-5">🅿️</span>
                                    <span>停車: ${item.parkingInfo}</span>
                                </p>` : ''}
                            </div>
                        </div>
                        <div class="md:col-span-2 space-y-4 md:pl-4">
                            <div>
                                <h4 class="text-xl font-semibold mb-1 text-gray-700 border-b border-gray-200 pb-1">${item.type === '景點' ? '歷史人文 & 達人見解' : '招牌料理 & 專家推薦'}</h4>
                                <p class="text-gray-600 italic mt-2 font-medium">${item.expertRec}</p>
                                <p class="text-sm text-gray-500 mt-2">${item.historyCulture}</p>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold mb-1 text-gray-700 border-b border-gray-200 pb-1">${item.type === '景點' ? '參拜重點 & 絕佳拍照點' : '人氣焦點 & 必拍美食照'}</h4>
                                <div class="text-sm text-gray-600 mt-2 space-y-1">${item.focusPoints}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            highlightsSection.classList.remove('hidden');
        }
    }

    // --- UPDATED Function to render Themed Guides page ---
    function initThemedGuides() {
        if (!tripData.themedGuidesData) return;
        const container = document.getElementById('themed-guides-container');
        const guides = tripData.themedGuidesData;
        let html = '';

        // Render Amulets Guide
        if (guides.amulets) {
            html += `
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold mb-2">${guides.amulets.title}</h3>
                    <p class="text-gray-600 mb-6">${guides.amulets.description}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${guides.amulets.items.map(item => `
                            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <h4 class="font-bold text-lg text-gray-800">${item.name} <span class="text-sm font-normal text-gray-500">- ${item.prefecture}</span></h4>
                                <p class="mt-2 text-sm text-gray-700"><span class="font-semibold text-gray-900">人氣推薦:</span> ${item.popular}</p>
                                ${item.special ? `<p class="mt-1 text-sm text-gray-700"><span class="font-semibold text-gray-900">特別限定:</span> ${item.special}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Render Souvenirs Guide
        if (guides.souvenirs) {
            html += `
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold mb-2">${guides.souvenirs.title}</h3>
                    <p class="text-gray-600 mb-6">${guides.souvenirs.description}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        ${guides.souvenirs.items.map(item => `
                            <div>
                                 <h4 class="font-bold text-lg text-gray-800 border-b-2 border-gray-200 pb-2">${item.name}</h4>
                                 <ul class="list-disc list-inside mt-3 space-y-2 text-gray-700">
                                    ${item.items.map(s => `<li>${s}</li>`).join('')}
                                 </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Render Anime Pilgrimage Guide
        if (guides.animePilgrimage) {
            html += `
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold mb-2">${guides.animePilgrimage.title}</h3>
                    <p class="text-gray-600 mb-6">${guides.animePilgrimage.description}</p>
                     <div class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="p-3 font-semibold">作品名稱</th>
                                    <th class="p-3 font-semibold">對應景點</th>
                                </tr>
                            </thead>
                            <tbody>
                            ${guides.animePilgrimage.items.map(item => `
                                <tr class="border-b">
                                    <td class="p-3 font-semibold align-top">${item.name}</td>
                                    <td class="p-3 align-top">${item.locations.join('、 ')}</td>
                                </tr>
                            `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
    }


    // --- UPDATED Function to render the Awards page ---
    function initAwards() {
        if (!tripData.awardsData) return;

        const top100Container = document.getElementById('top-100-container');
        top100Container.innerHTML = tripData.awardsData.top100.map(category => `
            <div class="bg-white p-5 rounded-lg shadow-md award-card ${category.theme}">
                <h4 class="font-bold text-lg mb-3 text-gray-800">${category.title}</h4>
                <div class="space-y-3">
                    ${category.locations.map(loc => `
                        <div>
                            <p class="font-semibold text-gray-700">${loc.name} <span class="text-sm text-gray-500 font-normal">- ${loc.prefecture}</span></p>
                            <p class="text-sm text-gray-600 pl-2">${loc.details}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        const greatThreeContainer = document.getElementById('great-three-container');
        greatThreeContainer.innerHTML = tripData.awardsData.greatThree.map(category => {
            let contentHtml = '';
            if (category.status === '入選') {
                contentHtml = `
                    <div class="mt-2">
                        <p class="font-semibold text-2xl text-green-600">✓ 入選</p>
                        <div class="mt-2 bg-green-50 p-3 rounded-md">
                             <p class="font-semibold text-gray-800">${category.location.name} <span class="text-sm text-gray-500 font-normal">- ${category.location.prefecture}</span></p>
                             <p class="text-sm text-gray-600 mt-1">${category.location.description}</p>
                        </div>
                         <p class="text-xs text-gray-500 mt-2">其他兩大: ${category.others}</p>
                    </div>
                `;
            } else { // MODIFIED for "地区精選"
                 contentHtml = `
                    <div class="mt-2">
                        <p class="font-semibold text-xl text-sky-600">✨ 地區精選</p>
                        <p class="text-sm text-gray-600 mt-1">${category.description}</p>
                        <div class="mt-2 bg-sky-50 p-3 rounded-md">
                             <p class="font-semibold text-gray-700">${category.alternative_title}:</p>
                             <ul class="list-disc list-inside text-sm text-gray-600 mt-1">
                                ${category.alternatives.map(alt => `<li>${alt}</li>`).join('')}
                             </ul>
                        </div>
                         <p class="text-xs text-gray-500 mt-2">日本三大: ${category.others}</p>
                    </div>
                `;
            }
            return `
                 <div class="bg-white p-5 rounded-lg shadow-md award-card ${category.theme}">
                    <h4 class="font-bold text-lg text-gray-800">${category.title}</h4>
                    ${contentHtml}
                </div>
            `;
        }).join('');
    }

    function initTransport() {
        // Render Accommodation
        const accommodationSection = document.getElementById('accommodation-section');
        if (tripData.accommodation && tripData.accommodation.length > 0) {
            const accommodationList = document.getElementById('accommodation-list');
            accommodationList.innerHTML = tripData.accommodation.map(item => `
                <div class="border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h4 class="text-lg font-bold"><a href="${item.url}" target="_blank" class="text-blue-600 hover:underline">${item.name}</a></h4>
                    <p class="text-sm text-gray-500">Day ${item.day} | ${item.city}</p>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="font-semibold text-gray-800 mb-1">🅿️ 停車資訊</p>
                            <p class="text-gray-600">${item.parking}</p>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800 mb-1">🏪 周邊便利商店</p>
                            <ul class="list-disc list-inside text-gray-600">
                                ${item.convenienceStores.map(store => `<li><span class="font-semibold">${store.brand}:</span> ${store.name}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `).join('');
            accommodationSection.classList.remove('hidden');
        }

        // Render Transport Pass Details
        const passSection = document.getElementById('transport-pass-section');
        if (tripData.transportPass) {
            document.getElementById('transport-pass-title').innerHTML = tripData.transportPass.title;
            let detailsHtml = '';
            for (const [key, value] of Object.entries(tripData.transportPass.details)) {
                detailsHtml += `<p><span class="emphasis">${key}:</span> ${value}</p>`;
            }
            detailsHtml += `<div class="mt-4">${tripData.transportPass.description}</div>`;
            document.getElementById('transport-pass-details').innerHTML = detailsHtml;
            passSection.classList.remove('hidden');
        }

        // Render Transport Pass Analysis
        const analysisSection = document.getElementById('transport-analysis-section');
        if (tripData.transportPassAnalysis) {
            document.getElementById('transport-analysis-content').innerHTML = tripData.transportPassAnalysis;
            analysisSection.classList.remove('hidden');
        } else {
            analysisSection.classList.add('hidden');
        }
        
        // Render Transport Summary
        const summarySection = document.getElementById('transport-summary-section');
        if(tripData.transportSummary && tripData.transportSummary.length > 0) {
            const transportSummaryTable = document.getElementById('transport-summary-table');
            transportSummaryTable.innerHTML = tripData.transportSummary.map(item => `
                    <tr class="border-b">
                        <td class="p-3">Day ${item.day}</td>
                        <td class="p-3">${item.route}</td>
                        <td class="p-3">${item.transport}</td>
                        <td class="p-3">${item.time}</td>
                        <td class="p-3">${item.cost}</td>
                    </tr>
            `).join('');
            summarySection.classList.remove('hidden');
        }

        // Render Transport Tactics
        const tacticSection = document.getElementById('transport-tactic-section');
        if (tripData.transportTactics && tripData.transportTactics.length > 0) {
            const tacticList = document.getElementById('transport-tactic-list');
            tacticList.innerHTML = tripData.transportTactics.map(item => `<li>${item}</li>`).join('');
            tacticSection.classList.remove('hidden');
        }
    }

    function initDaily() {
        const dayNav = document.getElementById('day-nav');
        document.getElementById('daily-title').innerText = `每日行程 (${Object.keys(tripData.dailyData).length}天)`;

        if (!dayNav.innerHTML) { // Only build nav if it's empty
            Object.keys(tripData.dailyData).forEach((key, index) => {
                const dayNum = key.replace('day', '');
                const btn = document.createElement('button');
                btn.className = "day-nav-item py-2 px-3 md:px-4 text-sm font-semibold rounded-md hover:bg-gray-200 transition-colors";
                btn.dataset.day = dayNum;
                btn.textContent = `D${dayNum}`;
                btn.addEventListener('click', () => {
                    renderDailyTimeline(dayNum);
                    dayNav.querySelectorAll('button').forEach(b => b.classList.remove('day-nav-active'));
                    btn.classList.add('day-nav-active');
                });
                dayNav.appendChild(btn);
            });
        }
        // Activate first day if no day is active
        if (!dayNav.querySelector('.day-nav-active')) {
            const firstButton = dayNav.querySelector('button');
            if (firstButton) {
                firstButton.classList.add('day-nav-active');
                renderDailyTimeline(firstButton.dataset.day);
            }
        }
    }

    // --- HEAVILY MODIFIED Function to render the Daily Timeline ---
    function renderDailyTimeline(day) {
        const data = tripData.dailyData[`day${day}`];
        const dailyContent = document.getElementById('daily-content');
        if (!data) { dailyContent.innerHTML = `<p>本日行程資料不存在。</p>`; return; }

        let timelineHtml = '';
        if (data.options) {
            timelineHtml += `<div class="flex justify-center flex-wrap gap-2 mb-4" id="option-tabs-${day}">`;
            Object.keys(data.options).forEach((key, index) => {
                timelineHtml += `<button data-option="${key}" class="option-tab py-2 px-4 text-sm font-semibold rounded-md hover:bg-gray-300 transition-colors ${index === 0 ? 'option-tab-active' : ''}">${data.options[key].label}</button>`;
            });
            timelineHtml += `</div><div id="timeline-container-${day}"></div>`;
        } else {
            timelineHtml = `<div id="timeline-container-${day}"></div>`;
        }
        
        const allIntel = { ...(data.intel || {}), ...(data.insights || {}) };
        
        let intelHtml = Object.keys(allIntel).length > 0 ? '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">' : '';
        for (const intelItem of Object.values(allIntel)) {
            let content = intelItem.items 
                ? `<ul class="list-disc list-inside space-y-1 text-gray-600">${intelItem.items.map(i => `<li class="leading-relaxed">${i}</li>`).join('')}</ul>`
                : `<p class="text-gray-600 leading-relaxed">${intelItem.text}</p>`;
            intelHtml += `
                <div class="bg-white p-5 rounded-lg shadow-md">
                    <h4 class="font-bold text-lg mb-2 text-gray-800">${intelItem.title}</h4>
                    ${content}
                </div>
            `;
        }
        if (Object.keys(allIntel).length > 0) {
            intelHtml += '</div>';
        }


        dailyContent.innerHTML = `
            <div class="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                <div class="text-center mb-6"><h3 class="text-2xl font-bold">${data.title}</h3><p class="text-md text-gray-500">${data.date} | ${data.location}</p></div>
                ${timelineHtml}
            </div>
            ${intelHtml}
        `;
        
        const renderTimelineContent = (timelineData) => {
            document.getElementById(`timeline-container-${day}`).innerHTML = `<div class="relative pl-8">${timelineData.map(item => {
                // --- START of Injected Tactical Info Logic ---
                let extraInfoHtml = '';
                const eventText = item.event.toLowerCase();

                // 1. Anime Pilgrim Spot
                if (eventText.includes('竹原')) {
                    extraInfoHtml += `<p class="text-sm text-purple-600 mt-2 bg-purple-50 p-2 rounded-md">🎥 <span class="font-semibold">聖地巡禮:</span> 此地為動畫《玉響～tamayura～》的主要舞台。</p>`;
                } else if (eventText.includes('由良') || eventText.includes('青山剛昌')) {
                    extraInfoHtml += `<p class="text-sm text-purple-600 mt-2 bg-purple-50 p-2 rounded-md">🎥 <span class="font-semibold">聖地巡禮:</span> 這裡是《名偵探柯南》作者青山剛昌的故鄉。</p>`;
                } else if (eventText.includes('境港') || eventText.includes('水木茂')) {
                    extraInfoHtml += `<p class="text-sm text-purple-600 mt-2 bg-purple-50 p-2 rounded-md">🎥 <span class="font-semibold">聖地巡禮:</span> 歡迎來到《鬼太郎》的世界！</p>`;
                }

                // 2. Amulet/Souvenir Tips
                if (eventText.includes('出雲大社')) {
                    extraInfoHtml += `<p class="text-sm text-orange-600 mt-2 bg-orange-50 p-2 rounded-md">🎯 <span class="font-semibold">必買推薦:</span> 不可錯過最強緣結御守『緣結守』與情侶專用的『緣結筷』。</p>`;
                } else if (eventText.includes('嚴島神社')) {
                     extraInfoHtml += `<p class="text-sm text-orange-600 mt-2 bg-orange-50 p-2 rounded-md">🎯 <span class="font-semibold">必買推薦:</span> 海上鳥居造型的『交通安全守』與用神明衣料製作的『御神衣守』是人氣首選。</p>`;
                } else if (eventText.includes('吉備津神社')) {
                     extraInfoHtml += `<p class="text-sm text-orange-600 mt-2 bg-orange-50 p-2 rounded-md">🎯 <span class="font-semibold">必買推薦:</span> 必買可愛的『桃太郎守』並挑戰桃子形狀的『桃子籤』！</p>`;
                }

                // 3. IG Hotspot Tag
                const igSpots = ["嚴島神社", "倉敷美觀", "鳥取砂丘", "出雲大社", "後樂園", "稻佐之濱", "足立美術館", "鷲羽山"];
                for (const spot of igSpots) {
                    if (eventText.includes(spot.toLowerCase())) {
                        extraInfoHtml += `<p class="text-sm text-cyan-700 font-semibold mt-2">📸 IG 熱門打卡點</p>`;
                        break;
                    }
                }
                // --- END of Injected Tactical Info Logic ---

                let awardHtml = item.awardHighlight ? `<p class="text-sm text-amber-600 font-bold mt-2">🏆 ${item.awardHighlight}</p>` : '';
                let parkingHtml = item.parkingInfo ? `<p class="text-sm text-gray-500 mt-1 bg-gray-100 p-2 rounded-md">🅿️ <span class="font-semibold">停車資訊:</span> ${item.parkingInfo}</p>` : '';
                let ticketHtml = item.ticketInfo ? `<p class="text-sm text-green-600 mt-1">🎟️ <span class="font-semibold">門票資訊:</span> ${item.ticketInfo}</p>` : '';
                
                return `
                <div class="timeline-item relative pb-8">
                    <div class="timeline-icon text-lg">${item.type}</div>
                    <div class="ml-8">
                        <p class="font-bold text-gray-800">${item.time}</p>
                        <p class="text-gray-700">${item.event}</p>
                        <p class="text-sm text-gray-500 italic mt-1">${item.description || ''}</p>
                        <div class="mt-1 space-y-1">${extraInfoHtml}</div>
                        ${awardHtml}
                        ${item.cost ? `<p class="text-sm text-red-500 mt-1">花費: ${item.cost}</p>` : ''}
                        ${item.stay ? `<p class="text-sm text-blue-500 mt-1">建議停留: ${item.stay}</p>` : ''}
                        ${ticketHtml}
                        ${parkingHtml}
                    </div>
                </div>`;
            }).join('')}</div>`;
        }

        if (data.options) {
            const optionTabs = document.getElementById(`option-tabs-${day}`);
            optionTabs.addEventListener('click', (e) => {
                if(e.target.tagName === 'BUTTON') {
                    const optionKey = e.target.dataset.option;
                    renderTimelineContent(data.options[optionKey].timeline);
                    optionTabs.querySelectorAll('button').forEach(b => b.classList.remove('option-tab-active'));
                    e.target.classList.add('option-tab-active');
                }
            });
            renderTimelineContent(data.options[Object.keys(data.options)[0]].timeline);
        } else if (data.timeline) {
             renderTimelineContent(data.timeline);
        }
    }

    function initPrep() {
        const prepData = tripData.prepList;
        if (prepData) {
            document.getElementById('prep-description').innerHTML = prepData.description || '';
            const prepContainer = document.getElementById('prep-list-container');
            prepContainer.innerHTML = prepData.categories.map(category => `
                <div>
                    <h4 class="text-lg font-bold text-gray-800 border-b pb-1 mb-3">${category.category}</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                        ${category.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `).join('');
        }
        
        const memoSection = document.getElementById('prep-memo-section');
        if (tripData.prepMemos) {
            const memoContent = document.getElementById('prep-memo-content');
            memoContent.innerHTML = tripData.prepMemos.map(memo => `
                <div>
                    <h4 class="font-bold">${memo.title}</h4>
                    <p class="text-gray-600">${memo.content}</p>
                </div>
            `).join('');
            memoSection.classList.remove('hidden');
        }

        const expertSection = document.getElementById('prep-expert-section');
        if (tripData.prepExpertTips) {
            const expertContent = document.getElementById('prep-expert-content');
            expertContent.innerHTML = tripData.prepExpertTips.map(tip => `
                <div>
                    <h4 class="font-bold">${tip.title}</h4>
                    <p class="text-gray-600">${tip.content}</p>
                </div>
            `).join('');
            expertSection.classList.remove('hidden');
        }
    }
    
    // --- START THE APP ---
    initializePage();
});