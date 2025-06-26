// START OF THE COMPLETE SCRIPT.JS FILE

// ===================================================
//
//      !!! CONTROL THE APP VERSION HERE !!!
//      Set to 'true' to simulate the Pro version.
//
const isPro = true;
//
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- DATA (from your original code) ---
  const emojiFlags = { /* Your original emoji object... */ 'America/New_York': '🇺🇸', 'America/Toronto': '🇨🇦', 'America/Chicago': '🇺🇸', 'America/Denver': '🇺🇸', 'America/Los_Angeles': '🇺🇸', 'America/Phoenix': '🇺🇸', 'America/Anchorage': '🇺🇸', 'America/Vancouver': '🇨🇦', 'America/Winnipeg': '🇨🇦', 'America/Halifax': '🇨🇦', 'America/Sao_Paulo': '🇧🇷', 'America/Buenos_Aires': '🇦🇷', 'America/Bogota': '🇨🇴', 'America/Lima': '🇵🇪', 'America/Asuncion': '🇵🇾', 'America/Caracas': '🇻🇪', 'America/La_Paz': '🇧🇴', 'America/Montevideo': '🇺🇾', 'America/Paramaribo': '🇸🇷', 'America/Guayaquil': '🇪🇨', 'Europe/London': '🇬🇧', 'Europe/Paris': '🇫🇷', 'Europe/Berlin': '🇩🇪', 'Europe/Madrid': '🇪🇸', 'Europe/Rome': '🇮🇹', 'Europe/Amsterdam': '🇳🇱', 'Europe/Brussels': '🇧🇪', 'Europe/Vienna': '🇦🇹', 'Europe/Zurich': '🇨🇭', 'Europe/Prague': '🇨🇿', 'Africa/Lagos': '🇳🇬', 'Africa/Nairobi': '🇰🇪', 'Africa/Cairo': '🇪🇬', 'Africa/Johannesburg': '🇿🇦', 'Africa/Accra': '🇬🇭', 'Africa/Algiers': '🇩🇿', 'Africa/Tripoli': '🇱🇾', 'Africa/Maputo': '🇲🇿', 'Africa/Dar_es_Salaam': '🇹🇿', 'Africa/Windhoek': '🇳🇦', 'Asia/Tokyo': '🇯🇵', 'Asia/Kolkata': '🇮🇳', 'Asia/Shanghai': '🇨🇳', 'Asia/Seoul': '🇰🇷', 'Asia/Singapore': '🇸🇬', 'Asia/Bangkok': '🇹🇭', 'Asia/Dubai': '🇦🇪', 'Asia/Kathmandu': '🇳🇵', 'Asia/Tehran': '🇮🇷', 'Asia/Manila': '🇵🇭', 'Australia/Sydney': '🇦🇺', 'Australia/Melbourne': '🇦🇺', 'Australia/Perth': '🇦🇺', 'Australia/Brisbane': '🇦🇺', 'Australia/Adelaide': '🇦🇺', 'Australia/Hobart': '🇦🇺', 'Australia/Darwin': '🇦🇺', 'Australia/Currie': '🇦🇺', 'Australia/Broken_Hill': '🇦🇺', 'Australia/Lindeman': '🇦🇺', 'Pacific/Auckland': '🇳🇿', 'Pacific/Fiji': '🇫🇯', 'Pacific/Honolulu': '🇺🇸', 'Pacific/Port_Moresby': '🇵🇬', 'Pacific/Noumea': '🇳🇨', 'Pacific/Tongatapu': '🇹🇴', 'Pacific/Tarawa': '🇰🇮', 'Pacific/Palau': '🇵🇼', 'Pacific/Rarotonga': '🇨🇰', 'Pacific/Apia': '🇼🇸', 'UTC': '🌐' };
  const timezoneGroups = { /* Your original groups object... */ 'North America': ['America/New_York', 'America/Toronto', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Phoenix', 'America/Anchorage', 'America/Vancouver', 'America/Winnipeg', 'America/Halifax'], 'South America': ['America/Sao_Paulo', 'America/Buenos_Aires', 'America/Bogota', 'America/Lima', 'America/Asuncion', 'America/Caracas', 'America/La_Paz', 'America/Montevideo', 'America/Paramaribo', 'America/Guayaquil'], 'Europe': ['Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid', 'Europe/Rome', 'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Vienna', 'Europe/Zurich', 'Europe/Prague'], 'Africa': ['Africa/Lagos', 'Africa/Nairobi', 'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Accra', 'Africa/Algiers', 'Africa/Tripoli', 'Africa/Maputo', 'Africa/Dar_es_Salaam', 'Africa/Windhoek'], 'Asia': ['Asia/Tokyo', 'Asia/Kolkata', 'Asia/Shanghai', 'Asia/Seoul', 'Asia/Singapore', 'Asia/Bangkok', 'Asia/Dubai', 'Asia/Kathmandu', 'Asia/Tehran', 'Asia/Manila'], 'Australia': ['Australia/Sydney', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Brisbane', 'Australia/Adelaide', 'Australia/Hobart', 'Australia/Darwin', 'Australia/Currie', 'Australia/Broken_Hill', 'Australia/Lindeman'], 'Pacific': ['Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Honolulu', 'Pacific/Port_Moresby', 'Pacific/Noumea', 'Pacific/Tongatapu', 'Pacific/Tarawa', 'Pacific/Palau', 'Pacific/Rarotonga', 'Pacific/Apia'], 'UTC': ['UTC'] };
  
  // --- DOM ELEMENTS ---
  const selectorsContainer = document.getElementById('timezone-selectors');
  const addTzBtn = document.getElementById('add-timezone-btn');
  const copyBtn = document.getElementById('copy-btn');
  const icsBtn = document.getElementById('ics-btn');
  const htmlBtn = document.getElementById('html-btn');
  const modal = document.getElementById('upgrade-modal');
  const modalText = document.getElementById('modal-text');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const goProButtons = document.querySelectorAll('.go-pro-btn, #footer-pro-link');
  const datePicker = document.getElementById('date-picker');
  const saveTeamBtn = document.getElementById('save-team-btn');
  const loadTeamSelect = document.getElementById('load-team-select');
  const deleteTeamBtn = document.getElementById('delete-team-btn');

  // --- MODAL FUNCTIONS ---
  const showUpgradeModal = (message) => {
    modalText.textContent = message;
    modal.classList.add('visible');
  };
  const hideUpgradeModal = () => modal.classList.remove('visible');

  // --- RENDERING & UI FUNCTIONS ---
  const createTimezoneSelector = (tzData) => {
    const selectorId = `tz-selector-${Date.now()}`;
    const group = document.createElement('div');
    group.className = 'select-group';
    const isWorkingHoursDisabled = isPro ? '' : 'disabled';
    const proTooltip = isPro ? '' : 'title="Customizable working hours are a Pro feature. ✨"';

    group.innerHTML = `
      <button class="remove-tz-btn" title="Remove timezone">×</button>
      <div id="clock-${selectorId}" class="clock">--:--:--</div>
      <select id="${selectorId}"></select>
      <div class="working-hours">
        <input type="time" value="${tzData.start}" ${isWorkingHoursDisabled} ${proTooltip}>
        <span>-</span>
        <input type="time" value="${tzData.end}" ${isWorkingHoursDisabled} ${proTooltip}>
      </div>
    `;
    selectorsContainer.appendChild(group);

    const selectEl = group.querySelector('select');
    for (const groupName in timezoneGroups) {
      const optgroup = document.createElement('optgroup');
      optgroup.label = groupName;
      timezoneGroups[groupName].forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = `${emojiFlags[tz] || '🌐'} ${tz.replace(/_/g, ' ')}`;
        if (tz === tzData.tz) option.selected = true;
        optgroup.appendChild(option);
      });
      selectEl.appendChild(optgroup);
    }
    new Choices(selectEl, { searchResultLimit: 10, itemSelectText: '' });

    const updateClock = () => {
        const tz = selectEl.value; if (!tz) return;
        const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz }).format(new Date());
        group.querySelector('.clock').textContent = time;
    };
    setInterval(updateClock, 1000);
    updateClock();

    group.querySelector('.remove-tz-btn').addEventListener('click', () => { group.remove(); renderComparison(); });
    selectEl.addEventListener('change', renderComparison);
    group.querySelectorAll('input[type="time"]').forEach(input => input.addEventListener('change', renderComparison));
  };
  
  const updateURL = () => {
    if (!isPro) return;
    const selectors = Array.from(document.querySelectorAll('.select-group'));
    const params = new URLSearchParams();
    selectors.forEach((group, index) => {
        const tz = group.querySelector('select').value;
        const start = group.querySelector('input[type="time"]:first-of-type').value;
        const end = group.querySelector('input[type="time"]:last-of-type').value;
        params.set(`tz${index+1}`, `${tz}_${start}_${end}`);
    });
    history.replaceState(null, '', `?${params.toString()}`);
  }

  const renderComparison = () => {
    const timezonesData = Array.from(selectorsContainer.children).map(group => ({
      tz: group.querySelector('select').value,
      start: group.querySelector('input[type="time"]:first-of-type').value,
      end: group.querySelector('input[type="time"]:last-of-type').value,
    }));
    isPro ? renderGanttView(timezonesData) : renderBasicView(timezonesData);
    updateURL();
  };
  
  const renderGanttView = (timezonesData) => {
    const table = document.getElementById('comparison-table'); table.innerHTML = '';
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headerRow.innerHTML = `<th>UTC Hour</th>` + timezonesData.map(d => `<th>${d.tz.replace(/_/g, ' ')}</th>`).join('');
    const tbody = table.createTBody();
    for (let h = 0; h < 24; h++) {
      const row = tbody.insertRow(); row.insertCell().textContent = `${h}:00`;
      const selectedDate = datePicker.value || new Date().toISOString().split('T')[0];
      const [year, month, day] = selectedDate.split('-').map(Number);
      const utcDate = new Date(Date.UTC(year, month - 1, day, h, 30));
      let isOverlapHour = true;
      timezonesData.forEach(data => {
        const cell = row.insertCell(); cell.style.padding = '0';
        const localHour = parseInt(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: data.tz }).format(utcDate));
        const localTimeStr = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true, timeZone: data.tz }).format(utcDate);
        const startHour = parseInt(data.start.split(':')[0]); const endHour = parseInt(data.end.split(':')[0]);
        let status = 'night';
        if (localHour >= startHour && localHour < endHour) status = 'work';
        else if (Math.abs(localHour - startHour) <= 2 || Math.abs(localHour - endHour) <= 2) status = 'shoulder';
        if (status !== 'work') isOverlapHour = false;
        cell.innerHTML = `<div class="time-bar ${status}">${localTimeStr}</div>`;
      });
      if(isOverlapHour && timezonesData.length > 0) row.classList.add('overlap-row');
    }
  };

  const renderBasicView = (timezonesData) => {
    const table = document.getElementById('comparison-table'); table.innerHTML = '';
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headerRow.innerHTML = `<th>UTC Hour</th>` + timezonesData.map(d => `<th>${d.tz.replace(/_/g, ' ')}</th>`).join('');
    const tbody = table.createTBody();
    for (let h = 0; h < 24; h++) {
        const row = tbody.insertRow(); row.insertCell().textContent = `${h}:00`;
        const selectedDate = datePicker.value || new Date().toISOString().split('T')[0];
        const [year, month, day] = selectedDate.split('-').map(Number);
        const utcDate = new Date(Date.UTC(year, month - 1, day, h, 30));
        let isOverlapHour = true;
        timezonesData.forEach(data => {
            const cell = row.insertCell();
            const localHour = parseInt(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: data.tz }).format(utcDate));
            const localTimeStr = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true, timeZone: data.tz }).format(utcDate);
            cell.textContent = localTimeStr;
            if (!(localHour >= 9 && localHour < 17)) isOverlapHour = false;
        });
        if(isOverlapHour && timezonesData.length > 0) row.classList.add('highlight-row');
    }
  };

  // --- TEAM PRESETS LOGIC (PRO FEATURE) ---
  const getSavedTeams = () => JSON.parse(localStorage.getItem('timeCompareTeams')) || {};
  const saveTeams = (teams) => localStorage.setItem('timeCompareTeams', JSON.stringify(teams));
  const populateTeamDropdown = () => {
    if (!isPro) return;
    const teams = getSavedTeams();
    loadTeamSelect.innerHTML = '<option value="">— Load a Team —</option>';
    for (const teamName in teams) {
      const option = document.createElement('option');
      option.value = teamName;
      option.textContent = teamName;
      loadTeamSelect.appendChild(option);
    }
  };

  // --- EVENT HANDLER FUNCTIONS ---
  const handleAddTimezone = () => {
    if (!isPro && selectorsContainer.children.length >= 3) {
      showUpgradeModal("Add more than 3 timezones with Pro!");
      return;
    }
    createTimezoneSelector({ tz: 'UTC', start: '09:00', end: '17:00' });
    renderComparison();
  };

  const handleSaveTeam = () => {
    const teamName = prompt("Enter a name for this team preset:");
    if (!teamName) return;
    const currentConfig = Array.from(selectorsContainer.children).map(group => ({
      tz: group.querySelector('select').value,
      start: group.querySelector('input[type="time"]:first-of-type').value,
      end: group.querySelector('input[type="time"]:last-of-type').value,
    }));
    if (currentConfig.length === 0) { alert("Please add at least one timezone before saving."); return; }
    const teams = getSavedTeams();
    teams[teamName] = currentConfig;
    saveTeams(teams);
    alert(`Team "${teamName}" saved!`);
    populateTeamDropdown();
  };

  const handleLoadTeam = () => {
    const teamName = loadTeamSelect.value;
    if (!teamName) return;
    const teams = getSavedTeams();
    const teamConfig = teams[teamName];
    if (!teamConfig) return;
    selectorsContainer.innerHTML = '';
    teamConfig.forEach(tzData => createTimezoneSelector(tzData));
    renderComparison(); // Explicitly call render after loading
  };

  const handleDeleteTeam = () => {
    const teamName = loadTeamSelect.value;
    if (!teamName) { alert("Please select a team to delete."); return; }
    if (confirm(`Are you sure you want to delete "${teamName}"?`)) {
      const teams = getSavedTeams();
      delete teams[teamName];
      saveTeams(teams);
      alert(`Team "${teamName}" deleted.`);
      populateTeamDropdown();
    }
  };
  
  // --- INITIALIZATION ---
  const initialize = () => {
    // 1. Setup UI based on version
    if (isPro) {
      document.body.classList.add('pro-version');
      document.querySelectorAll('.pro-badge').forEach(b => b.style.display = 'none');
      document.getElementById('legend').innerHTML = `<div class="legend-item"><span class="legend-color" style="background: var(--work-bg);"></span> Working</div><div class="legend-item"><span class="legend-color" style="background: var(--shoulder-bg);"></span> Shoulder</div><div class="legend-item"><span class="legend-color" style="background: var(--night-bg);"></span> Night</div><div class="legend-item"><span class="legend-color" style="box-shadow: inset 0 0 0 2px var(--secondary-color); border: 1px solid #ddd;"></span> Overlap</div>`;
    } else {
      document.body.classList.add('free-version');
      document.getElementById('legend').innerHTML = `<div class="legend-item"><span class="legend-color" style="background: var(--highlight-color); border: 1px solid #ccc;"></span> Overlap (9am-5pm)</div>`;
    }

    // 2. Setup all event listeners
    addTzBtn.addEventListener('click', handleAddTimezone);
    modalCloseBtn.addEventListener('click', hideUpgradeModal);
    goProButtons.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); showUpgradeModal('Upgrade to unlock all features!'); }));
    copyBtn.addEventListener('click', () => isPro ? alert("Copied!") : showUpgradeModal('Copy to clipboard is a Pro feature!'));
    icsBtn.addEventListener('click', () => isPro ? alert("Generated .ics!") : showUpgradeModal('Generating .ics files is a Pro feature!'));
    htmlBtn.addEventListener('click', () => alert("Exported as HTML!"));
    datePicker.addEventListener('change', renderComparison);
    if (isPro) {
      saveTeamBtn.addEventListener('click', handleSaveTeam);
      loadTeamSelect.addEventListener('change', handleLoadTeam);
      deleteTeamBtn.addEventListener('click', handleDeleteTeam);
    }
    
    // 3. Load initial data and state
    datePicker.value = new Date().toISOString().split('T')[0];
    const params = new URLSearchParams(window.location.search);
    let initialTimezones = [];
    if (params.has('tz1') && isPro) {
      params.forEach((value, key) => {
        if (key.startsWith('tz')) {
          const [tz, start, end] = value.split('_');
          if(tz && start && end) initialTimezones.push({ tz, start, end });
        }
      });
    }
    if (initialTimezones.length === 0) {
      initialTimezones = [
        { tz: 'America/New_York', start: '09:00', end: '17:00' },
        { tz: 'Europe/London', start: '09:00', end: '17:00' },
        { tz: 'Asia/Tokyo', start: '09:00', end: '17:00' }
      ];
    }
    initialTimezones.forEach(tzData => createTimezoneSelector(tzData));
    
    // 4. Final setup and render
    if (isPro) {
      populateTeamDropdown();
    }
    renderComparison();
  };

  // Run the app
  initialize();

});

// END OF THE COMPLETE SCRIPT.JS FILE