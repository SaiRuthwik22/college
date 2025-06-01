
// Analytics logging utility functions

interface AnalyticsVisitPayload {
  userId?: string | null;
}

interface AnalyticsLoginPayload {
  userId: string;
}

interface AnalyticsCollegePayload {
  collegeId: string;
  userId?: string | null;
}

interface AnalyticsSearchPayload {
  query: string;
  userId?: string | null;
}

/**
 * Log a website visit
 * @param payload The analytics payload
 */
export async function logWebsiteVisit(payload: AnalyticsVisitPayload) {
  try {
    await fetch('https://apicollegerepo.lytortech.com/api/analytics/visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error logging website visit:', error);
  }
}

/**
 * Log a user login
 * @param payload The analytics payload
 */
export async function logUserLogin(payload: AnalyticsLoginPayload) {
  try {
    await fetch('https://apicollegerepo.lytortech.com/api/analytics/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error logging user login:', error);
  }
}

/**
 * Log a college view
 * @param payload The analytics payload
 */
export async function logCollegeView(payload: AnalyticsCollegePayload) {
  try {
    await fetch('https://apicollegerepo.lytortech.com/api/analytics/view-college', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error logging college view:', error);
  }
}

/**
 * Log a search query
 * @param payload The analytics payload
 */
export async function logSearchQuery(payload: AnalyticsSearchPayload) {
  try {
    await fetch('https://apicollegerepo.lytortech.com/api/analytics/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error logging search query:', error);
  }
}

/**
 * Log a college click
 * @param payload The analytics payload
 */
export async function logCollegeClick(payload: AnalyticsCollegePayload) {
  try {
    await fetch('https://apicollegerepo.lytortech.com/api/analytics/click-college', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Error logging college click:', error);
  }
}
