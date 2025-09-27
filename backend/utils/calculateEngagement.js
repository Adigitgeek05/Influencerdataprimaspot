/**
 * Calculate engagement rate (%)
 * Formula: ((avgLikes + avgComments) / followers) * 100
 * @param {number} avgLikes - Average likes per post
 * @param {number} avgComments - Average comments per post
 * @param {number} followers - Total followers count
 * @returns {number} engagement rate in percentage (rounded to 2 decimals)
 */
export const calculateEngagement = (avgLikes, avgComments, followers) => {
  if (!followers || followers === 0) return 0;
  const rate = ((avgLikes + avgComments) / followers) * 100;
  return Number(rate.toFixed(2));
};
