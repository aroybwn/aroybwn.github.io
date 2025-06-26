document.addEventListener('DOMContentLoaded', () => {

  const emojiFlags = { /* Retaining your original emoji object */
    'America/New_York': '🇺🇸', 'America/Toronto': '🇨🇦', 'America/Chicago': '🇺🇸', 'America/Denver': '🇺🇸', 'America/Los_Angeles': '🇺🇸', 'America/Phoenix': '🇺🇸', 'America/Anchorage': '🇺🇸', 'America/Vancouver': '🇨🇦', 'America/Winnipeg': '🇨🇦', 'America/Halifax': '🇨🇦', 'America/Sao_Paulo': '🇧🇷', 'America/Buenos_Aires': '🇦🇷', 'America/Bogota': '🇨🇴', 'America/Lima': '🇵🇪', 'America/Asuncion': '🇵🇾', 'America/Caracas': '🇻🇪', 'America/La_Paz': '🇧🇴', 'America/Montevideo': '🇺🇾', 'America/Paramaribo': '🇸🇷', 'America/Guayaquil': '🇪🇨', 'Europe/London': '🇬🇧', 'Europe/Paris': '🇫🇷', 'Europe/Berlin': '🇩🇪', 'Europe/Madrid': '🇪🇸', 'Europe/Rome': '🇮🇹', 'Europe/Amsterdam': '🇳🇱', 'Europe/Brussels': '🇧🇪', 'Europe/Vienna': '🇦🇹', 'Europe/Zurich': '🇨🇭', 'Europe/Prague': '🇨🇿', 'Africa/Lagos': '🇳🇬', 'Africa/Nairobi': '🇰🇪', 'Africa/Cairo': '🇪🇬', 'Africa/Johannesburg': '🇿🇦', 'Africa/Accra': '🇬🇭', 'Africa/Algiers': '🇩🇿', 'Africa/Tripoli': '🇱🇾', 'Africa/Maputo': '🇲🇿', 'Africa/Dar_es_Salaam': '🇹🇿', 'Africa/Windhoek': '🇳🇦', 'Asia/Tokyo': '🇯🇵', 'Asia/Kolkata': '🇮🇳', 'Asia/Shanghai': '🇨🇳', 'Asia/Seoul': '🇰🇷', 'Asia/Singapore': '🇸🇬', 'Asia/Bangkok': '🇹🇭', 'Asia/Dubai': '🇦🇪', 'Asia/Kathmandu': '🇳🇵', 'Asia/Tehran': '🇮🇷', 'Asia/Manila': '🇵🇭', 'Australia/Sydney': '🇦🇺', 'Australia/Melbourne': '🇦🇺', 'Australia/Perth': '🇦🇺', 'Australia/Brisbane': '🇦🇺', 'Australia/Adelaide': '🇦🇺', 'Australia/Hobart': '🇦🇺', 'Australia/Darwin': '🇦🇺', 'Australia/Currie': '🇦🇺', 'Australia/Broken_Hill': '🇦🇺', 'Australia/Lindeman': '🇦🇺', 'Pacific/Auckland': '🇳🇿', 'Pacific/Fiji': '🇫🇯', 'Pacific/Honolulu': '🇺🇸', 'Pacific/Port_Moresby': '🇵🇬', 'Pacific/Noumea': '🇳🇨', 'Pacific/Tongatapu': '🇹🇴', 'Pacific/Tarawa': '🇰🇮', 'Pacific/Palau': '🇵🇼', 'Pacific/Rarotonga': '🇨🇰', 'Pacific/Apia': '🇼🇸', 'UTC': '🌐'
  };
  const timezoneGroups = { /* Retaining your original groups object */
    'North America': ['America/New_York', 'America/Toronto', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Phoenix', 'America/Anchorage', 'America/Vancouver', 'America/Winnipeg', 'America/Halifax'], 'South America': ['America/Sao_Paulo', 'America/Buenos_Aires', 'America/Bogota', 'America/Lima', 'America/Asuncion', 'America/Caracas', 'America/La_Paz', 'America/Montevideo', 'America/Paramaribo', 'America/Guayaquil'], 'Europe': ['Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Europe/Madrid', 'Europe/Rome', 'Europe/Amsterdam', 'Europe/Brussels', 'Europe/Vienna', 'Europe/Zurich', 'Europe/Prague'], 'Africa': ['Africa/Lagos', 'Africa/Nairobi', 'Africa/Cairo', 'Africa/Johannesburg', 'Africa/Accra', 'Africa/Algiers', 'Africa/Tripoli', 'Africa/Maputo', 'Africa/Dar_es_Salaam', 'Africa/Windhoek'], 'Asia': ['Asia/Tokyo', 'Asia/Kolkata', 'Asia/Shanghai', 'Asia/Seoul', 'Asia/Singapore', 'Asia/Bangkok', 'Asia/Dubai', 'Asia/Kathmandu', 'Asia/Tehran', 'Asia/Manila'], 'Australia': ['Australia/Sydney', 'Australia/Melbourne', 'Australia/Perth', 'Australia/Brisbane', 'Australia/Adelaide', 'Australia/Hobart', 'Australia/Darwin', 'Australia/Currie', 'Australia/Broken_Hill', 'Australia/Lindeman'], 'Pacific': ['Pacific/Auckland', 'Pacific/Fiji', 'Pacific/Honolulu', 'Pacific/Port_Moresby', 'Pacific/Noumea', 'Pacific/Tongatapu', 'Pacific/Tarawa', 'Pacific/Palau', 'Pacific/Rarotonga', 'Pacific/Apia'], 'UTC': ['UTC']
  };

  const selectorsContainer = document.getElementById('timezone-selectors');
  const addTzBtn = document.getElementById('add-timezone-btn');
  const copyBtn = document.getElementById('copy-btn');
  const icsBtn = document.getElementById('ics-btn');
  const htmlBtn = document.getElementById('html-btn');

  let choicesInstances = [];
  let clockIntervals = [];

  const createTimezoneSelector = (tzData) => {
    const totalSelectors = selectorsContainer.children.length;
    const selectorId = `tz-selector-${Date.now()}`;

    const group = document.createElement('div');
    group.className = 'select-group';
    group.innerHTML = `
      <button class="remove-tz-btn" title="Remove timezone">×</button>
      <div id="clock-${selectorId}" class="clock">--:--:--</div>
      <select id="${selectorId}"></select>
      <div class="working-hours">
        <input type="time" value="${tzData.start}" title="Working hours start">
        <span>-</span>
        <input type="time" value="${tzData.end}" title="Working hours end">
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
        if (tz === tzData.tz) {
          option.selected = true;
        }
        optgroup.appendChild(option);
      });
      selectEl.appendChild(optgroup);
    }
    
    const choices = new Choices(selectEl, { searchResultLimit: 10, itemSelectText: '' });
    choicesInstances.push({ id: selectorId, instance: choices });

    const updateClock = () => {
      const tz = selectEl.value;
      if (!tz) return;
      const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz }).format(new Date());
      group.querySelector('.clock').textContent = time;
    };
    clockIntervals.push(setInterval(updateClock, 1000));
    updateClock();

    const triggerUpdate = () => {
      renderComparison();
      updateURL();
    };

    selectEl.addEventListener('change', triggerUpdate);
    group.querySelectorAll('input[type="time"]').forEach(input => input.addEventListener('change', triggerUpdate));
    group.querySelector('.remove-tz-btn').addEventListener('click', () => {
        const choiceIndex = choicesInstances.findIndex(c => c.id === selectorId);
        if (choiceIndex > -1) {
            choicesInstances[choiceIndex].instance.destroy();
            choicesInstances.splice(choiceIndex, 1);
        }
        const intervalIndex = clockIntervals.findIndex(int => int === clockIntervals[totalSelectors]);
        if(intervalIndex > -1) {
           clearInterval(clockIntervals[intervalIndex]);
           clockIntervals.splice(intervalIndex, 1);
        }
        group.remove();
        triggerUpdate();
    });
  };
  
  const renderComparison = () => {
    const selectors = Array.from(selectorsContainer.children);
    if(selectors.length === 0) {
        document.getElementById('comparison-table').innerHTML = '';
        updateExportButtons(false);
        return;
    }

    const timezonesData = selectors.map(group => ({
      tz: group.querySelector('select').value,
      start: group.querySelector('input[type="time"]:first-of-type').value,
      end: group.querySelector('input[type="time"]:last-of-type').value
    }));

    const table = document.getElementById('comparison-table');
    table.innerHTML = '';

    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headerRow.innerHTML = `<th>UTC Hour</th>` + timezonesData.map(d => `<th>${d.tz.replace(/_/g, ' ')}</th>`).join('');

    const tbody = table.createTBody();
    let hasOverlap = false;

    for (let h = 0; h < 24; h++) {
      const row = tbody.insertRow();
      row.insertCell().textContent = `${h}:00 - ${h+1}:00`;
      
      const utcDate = new Date(Date.UTC(2024, 0, 1, h, 30));
      let isOverlapHour = true;

      timezonesData.forEach(data => {
        const cell = row.insertCell();
        const localHour = parseInt(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: data.tz }).format(utcDate));
        const localTimeStr = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true, timeZone: data.tz }).format(utcDate);
        const startHour = parseInt(data.start.split(':')[0]);
        const endHour = parseInt(data.end.split(':')[0]);

        let status = 'night';
        if (localHour >= startHour && localHour < endHour) {
          status = 'work';
        } else if (Math.abs(localHour - startHour) <= 2 || Math.abs(localHour - endHour) <= 2) {
          status = 'shoulder';
        }
        if (status !== 'work') isOverlapHour = false;
        
        cell.innerHTML = `<div class="time-bar ${status}">${localTimeStr}</div>`;
      });
      
      if(isOverlapHour && timezonesData.length > 0) {
        row.classList.add('overlap-row');
        hasOverlap = true;
      }
    }
    updateExportButtons(hasOverlap);
  };
  
  const updateExportButtons = (hasOverlap) => {
      copyBtn.disabled = !hasOverlap;
      icsBtn.disabled = !hasOverlap;
  };
  
  const updateURL = () => {
      const selectors = Array.from(selectorsContainer.children);
      const params = selectors.map((group, index) => {
          const tz = group.querySelector('select').value;
          const start = group.querySelector('input[type="time"]:first-of-type').value;
          const end = group.querySelector('input[type="time"]:last-of-type').value;
          return `tz${index+1}=${tz}_${start}_${end}`;
      }).join('&');
      
      history.pushState(null, '', `?${params}`);
      localStorage.setItem('lastComparison', params);
  };
  
  const parseURLAndInit = () => {
    const params = new URLSearchParams(window.location.search);
    let initialData = [];

    if (params.toString()) {
      params.forEach(value => {
        const [tz, start, end] = value.split('_');
        if(tz && start && end) initialData.push({ tz, start, end });
      });
    } else if (localStorage.getItem('lastComparison')) {
      const savedParams = new URLSearchParams(localStorage.getItem('lastComparison'));
      savedParams.forEach(value => {
        const [tz, start, end] = value.split('_');
        if(tz && start && end) initialData.push({ tz, start, end });
      });
    } else {
      initialData = [
        { tz: 'America/New_York', start: '09:00', end: '17:00' },
        { tz: 'Europe/London', start: '09:00', end: '17:00' },
        { tz: 'Asia/Tokyo', start: '09:00', end: '17:00' }
      ];
    }
    
    initialData.forEach(createTimezoneSelector);
    renderComparison();
  };
  
  const copySlots = () => {
    const overlapRows = document.querySelectorAll('.overlap-row');
    if(overlapRows.length === 0) return;
    let text = "Ideal Meeting Slots:\n\n";
    overlapRows.forEach(row => {
      const cells = Array.from(row.cells);
      const utcTime = cells[0].textContent;
      const localTimes = cells.slice(1).map((cell, i) => {
        const tzName = document.querySelectorAll('.select-group select')[i].value.split('/')[1].replace(/_/g, ' ');
        return `${cell.textContent} (${tzName})`;
      }).join(' / ');
      text += `• ${utcTime} (UTC)  ->  ${localTimes}\n`;
    });
    navigator.clipboard.writeText(text).then(() => { alert("Copied suggested slots to clipboard!"); }, () => { alert("Failed to copy."); });
  };

  const generateICS = () => {
    const firstOverlapRow = document.querySelector('.overlap-row');
    if (!firstOverlapRow) return;
    const utcHour = parseInt(firstOverlapRow.cells[0].textContent.split(':')[0]);
    const today = new Date();
    const eventDate = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), utcHour, 0, 0));
    if (eventDate < today) { eventDate.setUTCDate(eventDate.getUTCDate() + 1); }
    const startTime = eventDate.toISOString().replace(/-|:|\.\d+/g, "");
    eventDate.setUTCHours(eventDate.getUTCHours() + 1);
    const endTime = eventDate.toISOString().replace(/-|:|\.\d+/g, "");
    const summary = "Team Sync Meeting";
    const attendees = Array.from(document.querySelectorAll('.select-group select')).map(s => s.value.replace(/_/g, ' ')).join(', ');
    const description = `Proposed meeting time based on overlapping availability for: ${attendees}.`;
    const icsContent = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//TimeCompare//EN', 'BEGIN:VEVENT', `UID:${Date.now()}@timecompare.tool`, `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, "")}`, `DTSTART:${startTime}`, `DTEND:${endTime}`, `SUMMARY:${summary}`, `DESCRIPTION:${description.replace(/\n/g, '\\n')}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'meeting_invite.ics'; a.click(); URL.revokeObjectURL(url);
  };
  
  const exportHTML = () => {
      const tableHTML = document.getElementById('comparison-table').outerHTML;
      if(!tableHTML) { alert("Nothing to export. Please add at least one timezone."); return; }
      const blob = new Blob([`<html><head><title>Timezone Comparison</title><style>table{border-collapse:collapse;width:100%;}th,td{border:1px solid #ccc;padding:8px;text-align:center;}.overlap-row{background-color:#e0f7fa;font-weight:bold;}</style></head><body><h1>Timezone Comparison</h1>${tableHTML}</body></html>`], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'meeting-slots.html'; a.click(); URL.revokeObjectURL(url);
  };

  addTzBtn.addEventListener('click', () => createTimezoneSelector({ tz: 'UTC', start: '09:00', end: '17:00' }));
  copyBtn.addEventListener('click', copySlots);
  icsBtn.addEventListener('click', generateICS);
  htmlBtn.addEventListener('click', exportHTML);
  
  parseURLAndInit();
});