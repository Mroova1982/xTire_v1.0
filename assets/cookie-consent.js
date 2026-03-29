/**
 * X-Tire Cookie Consent v1.0
 * Własny, lekki baner cookie consent zgodny z RODO.
 * Obsługuje: niezbędne, analityczne (Google Analytics 4), marketingowe.
 * GA4 jest ładowane TYLKO po wyrażeniu zgody na cookies analityczne.
 *
 * Użycie:
 *   1. Dodaj <script src="/assets/cookie-consent.js"></script> przed </body>
 *   2. Ustaw GA_MEASUREMENT_ID na swój identyfikator GA4 (np. G-XXXXXXXXXX)
 *   3. Gotowe — baner pojawi się automatycznie przy pierwszej wizycie.
 */

(function () {
  'use strict';

  // ─── KONFIGURACJA ────────────────────────────────────────────────────────────
  var GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← Zastąp swoim ID z Google Analytics
  var CONSENT_KEY       = 'xtire_cookie_consent';
  var CONSENT_VERSION   = '1';            // Zmień przy aktualizacji polityki
  // ─────────────────────────────────────────────────────────────────────────────

  // ─── HELPERS ─────────────────────────────────────────────────────────────────
  function getConsent() {
    try {
      var raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (obj.version !== CONSENT_VERSION) return null; // wymuszenie ponownej zgody
      return obj;
    } catch (e) { return null; }
  }

  function saveConsent(analytics, marketing) {
    var obj = {
      version:   CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      necessary: true,
      analytics: !!analytics,
      marketing: !!marketing
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(obj));
    return obj;
  }

  function loadGA() {
    if (document.getElementById('xtire-ga-script')) return;
    var s = document.createElement('script');
    s.id  = 'xtire-ga-script';
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function applyConsent(consent) {
    if (consent && consent.analytics) loadGA();
  }

  // ─── STYLE ───────────────────────────────────────────────────────────────────
  var CSS = `
    #xtire-cc-overlay {
      position: fixed; inset: 0; z-index: 99998;
      background: rgba(0,0,0,0.55); backdrop-filter: blur(4px);
      display: flex; align-items: flex-end; justify-content: center;
      padding: 0 16px 24px;
      animation: ccFadeIn 0.35s ease;
    }
    #xtire-cc-overlay.hidden { display: none; }
    @keyframes ccFadeIn { from { opacity: 0; } to { opacity: 1; } }

    #xtire-cc-box {
      background: #111; border: 1px solid rgba(255,255,255,0.1);
      border-top: 3px solid #C8FF00;
      border-radius: 12px; padding: 28px 32px 24px;
      max-width: 860px; width: 100%;
      box-shadow: 0 24px 64px rgba(0,0,0,0.7);
      font-family: 'Barlow', sans-serif; color: #ccc;
      animation: ccSlideUp 0.4s cubic-bezier(0.22,1,0.36,1);
    }
    @keyframes ccSlideUp {
      from { transform: translateY(40px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }

    #xtire-cc-box .cc-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 12px;
    }
    #xtire-cc-box .cc-icon {
      width: 36px; height: 36px; flex-shrink: 0;
      background: rgba(200,255,0,0.12); border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    }
    #xtire-cc-box .cc-title {
      font-family: 'Barlow Condensed', 'Barlow', sans-serif;
      font-size: 18px; font-weight: 800; text-transform: uppercase;
      letter-spacing: 0.05em; color: #fff;
    }
    #xtire-cc-box .cc-desc {
      font-size: 13px; line-height: 1.7; color: #999; margin-bottom: 20px;
    }
    #xtire-cc-box .cc-desc a { color: #C8FF00; text-decoration: none; }
    #xtire-cc-box .cc-desc a:hover { text-decoration: underline; }

    /* TOGGLES */
    #xtire-cc-box .cc-toggles {
      display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 24px;
    }
    #xtire-cc-box .cc-toggle-item {
      display: flex; align-items: center; gap: 10px; cursor: pointer;
    }
    #xtire-cc-box .cc-toggle-item.disabled { cursor: default; opacity: 0.5; }
    #xtire-cc-box .cc-toggle-label {
      font-size: 13px; color: #ccc; user-select: none;
    }
    #xtire-cc-box .cc-toggle-label strong { color: #fff; font-weight: 600; }

    /* Switch */
    .cc-switch { position: relative; width: 40px; height: 22px; flex-shrink: 0; }
    .cc-switch input { opacity: 0; width: 0; height: 0; position: absolute; }
    .cc-switch-track {
      position: absolute; inset: 0; border-radius: 22px;
      background: rgba(255,255,255,0.12); transition: background 0.25s;
      cursor: pointer;
    }
    .cc-switch-track::after {
      content: ''; position: absolute; top: 3px; left: 3px;
      width: 16px; height: 16px; border-radius: 50%;
      background: #666; transition: transform 0.25s, background 0.25s;
    }
    .cc-switch input:checked + .cc-switch-track { background: rgba(200,255,0,0.3); }
    .cc-switch input:checked + .cc-switch-track::after {
      transform: translateX(18px); background: #C8FF00;
    }
    .cc-switch input:disabled + .cc-switch-track { cursor: default; }

    /* BUTTONS */
    #xtire-cc-box .cc-buttons {
      display: flex; gap: 10px; flex-wrap: wrap; align-items: center;
    }
    #xtire-cc-box .cc-btn {
      font-family: 'Barlow Condensed', 'Barlow', sans-serif;
      font-size: 13px; font-weight: 800; letter-spacing: 0.08em;
      text-transform: uppercase; border-radius: 6px; cursor: pointer;
      padding: 10px 20px; border: none; transition: all 0.2s; white-space: nowrap;
    }
    #xtire-cc-box .cc-btn-accept-all {
      background: #C8FF00; color: #0a0a0a;
    }
    #xtire-cc-box .cc-btn-accept-all:hover { background: #d4ff1a; }
    #xtire-cc-box .cc-btn-save {
      background: transparent; color: #ccc;
      border: 1px solid rgba(255,255,255,0.2);
    }
    #xtire-cc-box .cc-btn-save:hover { border-color: #C8FF00; color: #C8FF00; }
    #xtire-cc-box .cc-btn-reject {
      background: transparent; color: #666;
      border: 1px solid rgba(255,255,255,0.08);
      margin-left: auto;
    }
    #xtire-cc-box .cc-btn-reject:hover { color: #999; border-color: rgba(255,255,255,0.2); }

    /* MANAGE LINK */
    #xtire-cc-manage {
      position: fixed; bottom: 20px; left: 20px; z-index: 9999;
      background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px; padding: 8px 14px;
      font-family: 'Barlow Condensed', 'Barlow', sans-serif;
      font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; color: #666; cursor: pointer;
      transition: all 0.2s; display: none;
    }
    #xtire-cc-manage:hover { color: #C8FF00; border-color: rgba(200,255,0,0.3); }
    #xtire-cc-manage.visible { display: block; }

    @media (max-width: 600px) {
      #xtire-cc-box { padding: 20px 18px 18px; }
      #xtire-cc-box .cc-toggles { gap: 14px; }
      #xtire-cc-box .cc-buttons { flex-direction: column; }
      #xtire-cc-box .cc-btn { width: 100%; text-align: center; }
      #xtire-cc-box .cc-btn-reject { margin-left: 0; }
      #xtire-cc-manage { bottom: 12px; left: 12px; }
    }
  `;

  // ─── HTML ─────────────────────────────────────────────────────────────────────
  var HTML = `
    <div id="xtire-cc-overlay" role="dialog" aria-modal="true" aria-label="Ustawienia cookies">
      <div id="xtire-cc-box">
        <div class="cc-header">
          <div class="cc-icon">🍪</div>
          <div class="cc-title">Ustawienia prywatności</div>
        </div>
        <p class="cc-desc">
          Używamy plików cookies, aby zapewnić prawidłowe działanie sklepu oraz — za Twoją zgodą —
          analizować ruch na stronie (Google Analytics). Możesz zaakceptować wszystkie cookies,
          wybrać tylko niezbędne lub dostosować ustawienia. Więcej informacji znajdziesz w naszej
          <a href="/polityka-prywatnosci/">Polityce Prywatności</a>.
        </p>

        <div class="cc-toggles">
          <!-- Niezbędne — zawsze włączone -->
          <label class="cc-toggle-item disabled" title="Wymagane do działania sklepu">
            <span class="cc-switch">
              <input type="checkbox" id="cc-necessary" checked disabled />
              <span class="cc-switch-track"></span>
            </span>
            <span class="cc-toggle-label"><strong>Niezbędne</strong> — koszyk, sesja</span>
          </label>

          <!-- Analityczne -->
          <label class="cc-toggle-item" for="cc-analytics">
            <span class="cc-switch">
              <input type="checkbox" id="cc-analytics" />
              <span class="cc-switch-track"></span>
            </span>
            <span class="cc-toggle-label"><strong>Analityczne</strong> — Google Analytics</span>
          </label>

          <!-- Marketingowe -->
          <label class="cc-toggle-item" for="cc-marketing">
            <span class="cc-switch">
              <input type="checkbox" id="cc-marketing" />
              <span class="cc-switch-track"></span>
            </span>
            <span class="cc-toggle-label"><strong>Marketingowe</strong> — remarketing</span>
          </label>
        </div>

        <div class="cc-buttons">
          <button class="cc-btn cc-btn-accept-all" id="cc-accept-all">Akceptuj wszystkie</button>
          <button class="cc-btn cc-btn-save"       id="cc-save">Zapisz wybór</button>
          <button class="cc-btn cc-btn-reject"     id="cc-reject">Tylko niezbędne</button>
        </div>
      </div>
    </div>

    <button id="xtire-cc-manage" title="Zarządzaj cookies" aria-label="Zarządzaj ustawieniami cookies">
      🍪 Cookies
    </button>
  `;

  // ─── INIT ─────────────────────────────────────────────────────────────────────
  function init() {
    // Wstrzyknij style
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Wstrzyknij HTML
    var wrapper = document.createElement('div');
    wrapper.innerHTML = HTML;
    document.body.appendChild(wrapper);

    var overlay    = document.getElementById('xtire-cc-overlay');
    var manageBtn  = document.getElementById('xtire-cc-manage');
    var chkAnalytics = document.getElementById('cc-analytics');
    var chkMarketing = document.getElementById('cc-marketing');

    function showBanner() {
      overlay.classList.remove('hidden');
      manageBtn.classList.remove('visible');
    }

    function hideBanner() {
      overlay.classList.add('hidden');
      manageBtn.classList.add('visible');
    }

    function acceptAll() {
      chkAnalytics.checked = true;
      chkMarketing.checked = true;
      var c = saveConsent(true, true);
      applyConsent(c);
      hideBanner();
    }

    function saveSelected() {
      var c = saveConsent(chkAnalytics.checked, chkMarketing.checked);
      applyConsent(c);
      hideBanner();
    }

    function rejectAll() {
      chkAnalytics.checked = false;
      chkMarketing.checked = false;
      var c = saveConsent(false, false);
      applyConsent(c);
      hideBanner();
    }

    document.getElementById('cc-accept-all').addEventListener('click', acceptAll);
    document.getElementById('cc-save').addEventListener('click', saveSelected);
    document.getElementById('cc-reject').addEventListener('click', rejectAll);
    manageBtn.addEventListener('click', function() {
      // Przywróć stan checkboxów z zapisanej zgody
      var c = getConsent();
      if (c) {
        chkAnalytics.checked = !!c.analytics;
        chkMarketing.checked = !!c.marketing;
      }
      showBanner();
    });

    // Sprawdź istniejącą zgodę
    var existing = getConsent();
    if (existing) {
      applyConsent(existing);
      hideBanner();
    } else {
      showBanner();
    }
  }

  // Uruchom po załadowaniu DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
