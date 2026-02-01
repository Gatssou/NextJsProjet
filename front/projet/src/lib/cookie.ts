import Cookies from 'js-cookie';
import { CookieConsent } from '@/app/components/CookieConsent/cookieTypes';

const CONSENT_COOKIE = 'cookie_consent';

export function getCookieConsent(): CookieConsent | null {
  const value = Cookies.get(CONSENT_COOKIE);
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function setCookieConsent(consent: CookieConsent) {
  Cookies.set(CONSENT_COOKIE, JSON.stringify(consent), {
    expires: 180, // 6 mois
    sameSite: 'lax',
    secure: true,
  });
}
