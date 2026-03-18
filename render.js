// --- RENDER SCRIPT ---
// Version 9.0.0: Pointer Decoupling & Auto Linkify Engine

document.addEventListener('DOMContentLoaded', () => {
    if (typeof tripData === 'undefined') {
        console.error("行程資料 (tripData) 未載入！");
        document.getElementById('main-title').innerText = "錯誤：行程資料遺失";
        return;
    }

  function linkify(text) {
        if (!text || typeof text !== 'string') return text;
        if (typeof placeDB === 'undefined') return text;
        
        // 確保比對時先比對長的字串 (如 "明治神宮鎮守之森" 優先於 "明治神宮")
        const keys = Object.keys(placeDB).sort((a, b) => b.length - a.length);
        if (keys.length === 0) return text;

        // 避免重複解析已有的 <a> 標籤
        const regexStr = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        const regex = new RegExp(`(<a[^>]*>.*?</a>)|(${regexStr})`, 'g');
        
        return text.replace(regex, (match, aTag, keyword) => {
            if (aTag) return aTag; // 若已經是超連結，跳過
            if (keyword) {
                const dbItem = placeDB[keyword];
                const queryStr = encodeURIComponent(dbItem.query || keyword);
                const url = dbItem.placeId 
                    ? `https://www.google.com/maps/search/?api=1&query=$${queryStr}&query_place_id=${dbItem.placeId}`
                    : `https://www.google.com/maps/search/?api=1&query=$${queryStr}`;
                
                // 優化：移除藍色、粗體與底線。改為繼承原文字顏色，僅在 Hover 時變色提示可點擊
                return `<a href="${url}" target="_blank" class="hover:text-blue-500 transition-colors duration-200 cursor-pointer">${keyword}</a>`;
            }
            return match;
        });
    }

    // 專門處理含有 placeKey 結構的連結生成器
    function makeDirectLink(name, placeKey) {
        if (!placeKey || typeof placeDB === 'undefined' || !placeDB[placeKey]) return name;
        const dbItem = placeDB[placeKey];
        const queryStr = encodeURIComponent(dbItem.query || placeKey);
        const url = dbItem.placeId 
            ? `https://www.google.com/maps/search/?api=1&query=$${queryStr}&query_place_id=${dbItem.placeId}`
            : `https://www.google.com/maps/search/?api=1&query=$${queryStr}`;
            
        // 同步優化樣式
        return `<a href="${url}" target="_blank" class="hover:text-blue-500 transition-colors duration-200 cursor-pointer">${name}</a>`;
    }


    // --- GLOBAL ELEMENTS ---
    const mainNav = document.getElementById('main-nav');
    const sections = document.querySelectorAll('.main-section');
    const overviewChartCtx = document.getElementById('overviewChart').getContext('2d');
    let overviewChartInstance = null;
    
    // --- INITIALIZATION ---
    function initializePage() {
        document.title = tripData.meta.title;
        document.getElementById('main-title').innerText = tripData.meta.mainTitle;

        mainNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const sectionId = e.target.dataset.section;
                mainNav.querySelectorAll('button').forEach(btn => btn.classList.remove('main-nav-active'));
                e.target.classList.add('main-nav-active');
                sections.forEach(section => section.id === sectionId ? section.classList.remove('hidden') : section.classList.add('hidden'));
                window.scrollTo(0, 0); 
                
                switch (sectionId) {
                    case 'overview': initOverview(); break;
                    case 'themed-guides': initThemedGuides(); break;
                    case 'awards': initAwards(); break;
                    case 'transport': initTransport(); break;
                    case 'daily': initDaily(); break;
                    case 'prep': initPrep(); break;
                }
            }
        });

        const firstNavButton = document.querySelector('#main-nav button[data-section="overview"]');
        if (firstNavButton) {
            firstNavButton.classList.add('main-nav-active');
            document.getElementById('overview').classList.remove('hidden');
            initOverview();
        }
    }

    // --- RENDER FUNCTIONS ---
    function initOverview() {
        if (overviewChartInstance) overviewChartInstance.destroy();
        const labels = Object.keys(tripData.dailyData).map(key => `D${key.replace('day', '')}`);
        const activityData = Object.values(tripData.dailyData).map(d => {
            if (d.options) {
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

        const seasonalSection = document.getElementById('seasonal-section');
        if (tripData.seasonalData) {
            const seasonalGrid = document.getElementById('seasonal-highlights');
            seasonalGrid.innerHTML = Object.values(tripData.seasonalData).map(season => `
                <div class="seasonal-card ${season.theme_color} p-4 rounded-lg shadow-md">
                    <h4 class="font-bold text-lg mb-2 flex items-center">${season.icon} ${season.title}</h4>
                    <div class="space-y-3 text-sm">
                        <div>
                            <h5 class="font-semibold text-gray-700">季節活動</h5>
                            <ul class="list-disc list-inside text-gray-600">${season.highlights.map(item => `<li>${linkify(item)}</li>`).join('')}</ul>
                        </div>
                        <div>
                            <h5 class="font-semibold text-gray-700">時令美食</h5>
                            <ul class="list-disc list-inside text-gray-600">${season.foods.map(item => `<li>${linkify(item)}</li>`).join('')}</ul>
                        </div>
                    </div>
                </div>
            `).join('');
            seasonalSection.classList.remove('hidden');
        }

        const highlightsSection = document.getElementById('highlights-section');
        if (tripData.detailedHighlights && tripData.detailedHighlights.length > 0) {
            document.getElementById('highlights-description').innerText = `以下是本次行程中的 ${tripData.detailedHighlights.length} 個核心目標，融合了歷史人文、專家建議與美食人氣焦點。列表已按行程順序排列。`;
            const highlightsGrid = document.getElementById('highlights-grid');
            highlightsGrid.innerHTML = tripData.detailedHighlights.map(item => {
                const displayName = makeDirectLink(item.name, item.placeKey);
                return `
                <div class="highlight-card bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-shadow hover:shadow-2xl">
                    <div class="md:grid md:grid-cols-3 gap-6">
                        <div class="md:col-span-1 border-b md:border-r md:border-b-0 pb-4 mb-4 md:pb-0 md:mb-0 md:pr-4">
                            <h3 class="text-2xl font-bold text-gray-800">${displayName}</h3>
                            <span class="inline-block px-3 py-1 mt-2 text-sm font-semibold rounded-full ${item.type === '景點' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}">${item.type}</span>
                            <div class="mt-4 space-y-2 text-sm">
                                ${item.ticketInfo ? `
                                <p class="font-semibold flex items-center text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fill-rule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h4a1 1 0 100-2H7z" clip-rule="evenodd" /></svg>
                                    <span>門票: ${item.ticketInfo}</span>
                                </p>` : ''}
                                ${item.parkingInfo ? `
                                <p class="font-semibold flex items-start text-gray-700">
                                    <span class="text-lg mr-1 leading-5">🅿️</span>
                                    <span>停車: ${linkify(item.parkingInfo)}</span>
                                </p>` : ''}
                            </div>
                        </div>
                        <div class="md:col-span-2 space-y-4 md:pl-4">
                            <div>
                                <h4 class="text-xl font-semibold mb-1 text-gray-700 border-b border-gray-200 pb-1">${item.type === '景點' ? '歷史人文 & 達人見解' : '招牌料理 & 專家推薦'}</h4>
                                <p class="text-gray-600 italic mt-2 font-medium">${linkify(item.expertRec)}</p>
                                <p class="text-sm text-gray-500 mt-2">${linkify(item.historyCulture)}</p>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold mb-1 text-gray-700 border-b border-gray-200 pb-1">${item.type === '景點' ? '參拜重點 & 絕佳拍照點' : '人氣焦點 & 必拍美食照'}</h4>
                                <div class="text-sm text-gray-600 mt-2 space-y-1">${linkify(item.focusPoints)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `}).join('');
            highlightsSection.classList.remove('hidden');
        }
    }

    function initThemedGuides() {
        if (!tripData.themedGuidesData) return;
        const container = document.getElementById('themed-guides-container');
        const guides = tripData.themedGuidesData;
        let html = '';

        if (guides.amulets) {
            html += `
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold mb-2">${guides.amulets.title}</h3>
                    <p class="text-gray-600 mb-6">${linkify(guides.amulets.description)}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${guides.amulets.items.map(item => `
                            <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <h4 class="font-bold text-lg text-gray-800">${makeDirectLink(item.name, item.placeKey)} <span class="text-sm font-normal text-gray-500">- ${item.prefecture}</span></h4>
                                <p class="mt-2 text-sm text-gray-700"><span class="font-semibold text-gray-900">人氣推薦:</span> ${linkify(item.popular)}</p>
                                ${item.special ? `<p class="mt-1 text-sm text-gray-700"><span class="font-semibold text-gray-900">特別限定:</span> ${linkify(item.special)}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (guides.souvenirs) {
            html += `
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold mb-2">${guides.souvenirs.title}</h3>
                    <p class="text-gray-600 mb-6">${linkify(guides.souvenirs.description)}</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        ${guides.souvenirs.items.map(item => `
                            <div>
                                 <h4 class="font-bold text-lg text-gray-800 border-b-2 border-gray-200 pb-2">${makeDirectLink(item.name, item.placeKey)}</h4>
                                 <ul class="list-disc list-inside mt-3 space-y-2 text-gray-700">
                                    ${item.items.map(s => `<li>${linkify(s)}</li>`).join('')}
                                 </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (guides.animePilgrimage) {
            html += `
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-semibold mb-2">${guides.animePilgrimage.title}</h3>
                    <p class="text-gray-600 mb-6">${linkify(guides.animePilgrimage.description)}</p>
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
                                    <td class="p-3 align-top">${item.locations.map(loc => linkify(loc)).join('、 ')}</td>
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

    function initAwards() {
        if (!tripData.awardsData) return;

        const top100Container = document.getElementById('top-100-container');
        top100Container.innerHTML = tripData.awardsData.top100.map(category => `
            <div class="bg-white p-5 rounded-lg shadow-md award-card ${category.theme}">
                <h4 class="font-bold text-lg mb-3 text-gray-800">${category.title}</h4>
                <div class="space-y-3">
                    ${category.locations.map(loc => `
                        <div>
                            <p class="font-semibold text-gray-700">${makeDirectLink(loc.name, loc.placeKey)} <span class="text-sm text-gray-500 font-normal">- ${loc.prefecture}</span></p>
                            <p class="text-sm text-gray-600 pl-2">${linkify(loc.details)}</p>
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
                             <p class="font-semibold text-gray-800">${makeDirectLink(category.location.name, category.location.placeKey)} <span class="text-sm text-gray-500 font-normal">- ${category.location.prefecture}</span></p>
                             <p class="text-sm text-gray-600 mt-1">${linkify(category.location.description || category.description)}</p>
                        </div>
                         <p class="text-xs text-gray-500 mt-2">其他兩大: ${linkify(category.others)}</p>
                    </div>
                `;
            } else {
                 contentHtml = `
                    <div class="mt-2">
                        <p class="font-semibold text-xl text-sky-600">✨ ${category.status || '地區精選'}</p>
                        <p class="text-sm text-gray-600 mt-1">${linkify(category.description)}</p>
                        <div class="mt-2 bg-sky-50 p-3 rounded-md">
                             <p class="font-semibold text-gray-700">${category.alternative_title}:</p>
                             <ul class="list-disc list-inside text-sm text-gray-600 mt-1">
                                ${category.alternatives.map(alt => `<li>${linkify(alt)}</li>`).join('')}
                             </ul>
                        </div>
                         <p class="text-xs text-gray-500 mt-2">日本三大: ${linkify(category.others)}</p>
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
        const accommodationSection = document.getElementById('accommodation-section');
        if (tripData.accommodation && tripData.accommodation.length > 0) {
            const accommodationList = document.getElementById('accommodation-list');
            accommodationList.innerHTML = tripData.accommodation.map(item => `
                <div class="border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h4 class="text-lg font-bold">${makeDirectLink(item.name, item.placeKey)}</h4>
                    <p class="text-sm text-gray-500">Day ${item.day} | ${item.city}</p>
                    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="font-semibold text-gray-800 mb-1">🅿️ 停車資訊</p>
                            <p class="text-gray-600">${item.parking}</p>
                        </div>
                        <div>
                            <p class="font-semibold text-gray-800 mb-1">🏪 周邊便利商店</p>
                            <ul class="list-disc list-inside text-gray-600">
                                ${item.convenienceStores.map(store => `
                              <li>
                                  <span class="font-semibold">${store.brand}:</span> 
                                  ${makeDirectLink(store.name, store.placeKey)}
                              </li>
                          `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `).join('');
            accommodationSection.classList.remove('hidden');
        }

        const passSection = document.getElementById('transport-pass-section');
        if (tripData.transportPass) {
            document.getElementById('transport-pass-title').innerHTML = tripData.transportPass.title;
            let detailsHtml = '';
            for (const [key, value] of Object.entries(tripData.transportPass.details)) {
                detailsHtml += `<p><span class="emphasis">${key}:</span> ${value}</p>`;
            }
            detailsHtml += `<div class="mt-4">${linkify(tripData.transportPass.description)}</div>`;
            document.getElementById('transport-pass-details').innerHTML = detailsHtml;
            passSection.classList.remove('hidden');
        }

        const analysisSection = document.getElementById('transport-analysis-section');
        if (tripData.transportPassAnalysis) {
            document.getElementById('transport-analysis-content').innerHTML = linkify(tripData.transportPassAnalysis);
            analysisSection.classList.remove('hidden');
        } else {
            analysisSection.classList.add('hidden');
        }
        
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

        const tacticSection = document.getElementById('transport-tactic-section');
        if (tripData.transportTactics && tripData.transportTactics.length > 0) {
            const tacticList = document.getElementById('transport-tactic-list');
            tacticList.innerHTML = tripData.transportTactics.map(item => `<li>${linkify(item)}</li>`).join('');
            tacticSection.classList.remove('hidden');
        }
    }

    function initDaily() {
        const dayNav = document.getElementById('day-nav');
        document.getElementById('daily-title').innerText = `每日行程 (${Object.keys(tripData.dailyData).length}天)`;

        if (!dayNav.innerHTML) { 
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
        if (!dayNav.querySelector('.day-nav-active')) {
            const firstButton = dayNav.querySelector('button');
            if (firstButton) {
                firstButton.classList.add('day-nav-active');
                renderDailyTimeline(firstButton.dataset.day);
            }
        }
    }

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
        
let allIntel = { ...(data.intel || {}) };
        
        // 自動判斷 insights 的格式並安全轉換
        if (data.insights) {
            if (Array.isArray(data.insights)) {
                // 如果寫成字串陣列，自動幫它加上標題並轉換為物件
                allIntel.dailyInsights = {
                    title: "💡 每日大師洞察",
                    items: data.insights
                };
            } else if (typeof data.insights === 'object') {
                // 如果已經是物件，直接合併
                allIntel = { ...allIntel, ...data.insights };
            }
        }
        
        let intelHtml = '';
        const intelKeys = Object.keys(allIntel);
        
        if (intelKeys.length > 0) {
            intelHtml = '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">';
            for (const key of intelKeys) {
                const intelItem = allIntel[key];
                // 防禦機制：確保該項目是物件且有內容，避免 undefined
                if (!intelItem || typeof intelItem !== 'object') continue; 
                
                let content = '';
                if (intelItem.items && Array.isArray(intelItem.items) && intelItem.items.length > 0) {
                    content = `<ul class="list-disc list-inside space-y-1 text-gray-600">${intelItem.items.map(i => `<li class="leading-relaxed">${linkify(i)}</li>`).join('')}</ul>`;
                } else if (intelItem.text) {
                    content = `<p class="text-gray-600 leading-relaxed">${linkify(intelItem.text)}</p>`;
                }
                
                // 只有在標題與內容都存在時才渲染卡片
                if (intelItem.title && content) {
                    intelHtml += `
                        <div class="bg-white p-5 rounded-lg shadow-md">
                            <h4 class="font-bold text-lg mb-2 text-gray-800">${intelItem.title}</h4>
                            ${content}
                        </div>
                    `;
                }
            }
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
            document.getElementById(`timeline-container-${day}`).innerHTML = `
            <div class="relative pl-8">
                ${timelineData.map(item => {
                    let extraInfoHtml = '';
                    if (item.extraInfo && Array.isArray(item.extraInfo)) {
                        extraInfoHtml = item.extraInfo.map(info => {
                            const bgClass = info.type === 'pilgrim' ? 'bg-purple-50 text-purple-600' : 
                                            (info.type === 'strategy' || info.type === 'recommend') ? 'bg-orange-50 text-orange-600' : 
                                            'bg-cyan-50 text-cyan-700';
                            return `<p class="text-sm ${bgClass} mt-2 p-2 rounded-md font-medium">${linkify(info.text)}</p>`;
                        }).join('');
                    }

                    const badgeList = [
                        item.awardHighlight && item.awardHighlight !== "無" ? `<span class="text-[10px] bg-amber-50 text-amber-600 px-2 py-1 rounded-full font-bold">🏆 ${item.awardHighlight}</span>` : '',
                        (item.stay && item.stay !== "無") ? `<span class="text-[10px] bg-blue-50 text-blue-500 px-2 py-1 rounded-full font-bold">⏱️ ${item.stay}</span>` : '',
                        (item.ticketInfo && item.ticketInfo !== "無") ? `<span class="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">🎟️ ${item.ticketInfo}</span>` : ''
                    ].filter(b => b !== '').join('');

                    // 自動識別與渲染地點連結
                    const eventTitle = item.placeKey ? makeDirectLink(item.event, item.placeKey) : linkify(item.event);

                    return `
                    <div class="timeline-item relative pb-10">
                        <div class="timeline-icon w-12 h-12 text-xl absolute -left-6 top-0 flex items-center justify-center rounded-full bg-slate-800 text-white z-10 shadow-md">
                            ${item.type}
                        </div>
                        
                        <div class="ml-10">
                            <div class="flex justify-between items-start">
                                <p class="font-bold text-gray-800 text-lg">${item.time}</p>
                                ${(item.cost && item.cost !== "無") ? `<span class="text-xs font-bold text-red-500">💰 ${item.cost}</span>` : ''}
                            </div>
                            
                            <p class="text-gray-700 font-semibold mt-1">${eventTitle}</p>
                            <p class="text-sm text-gray-500 italic mt-1 leading-relaxed">${linkify(item.description || '')}</p>
                            
                            <div class="mt-2 space-y-1">
                                ${extraInfoHtml}
                            </div>
                            <div class="flex flex-wrap gap-2 mt-3">
                                ${badgeList}
                            </div>
                            
                            ${(item.parkingInfo && item.parkingInfo !== "無") ? `
                                <div class="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                                    <span class="font-bold text-gray-800">🅿️ 停車建議：</span>${linkify(item.parkingInfo)}
                                </div>
                            ` : ''}
                        </div>
                    </div>`;
                }).join('')}
            </div>`;
        };

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
            document.getElementById('prep-description').innerHTML = linkify(prepData.description || '');
            const prepContainer = document.getElementById('prep-list-container');
            prepContainer.innerHTML = prepData.categories.map(category => `
                <div>
                    <h4 class="text-lg font-bold text-gray-800 border-b pb-1 mb-3">${category.category}</h4>
                    <ul class="list-disc list-inside space-y-2 text-gray-700">
                        ${category.items.map(item => `<li>${linkify(item)}</li>`).join('')}
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
                    <p class="text-gray-600">${linkify(memo.content)}</p>
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
                    <p class="text-gray-600">${linkify(tip.content)}</p>
                </div>
            `).join('');
            expertSection.classList.remove('hidden');
        }
    }
    
    initializePage();
});
