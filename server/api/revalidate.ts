export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const secret = query.secret;

  if (secret !== process.env.REVALIDATE_SECRET) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
  }
});