import { Client, Databases, Query } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const databases = new Databases(client);

const logTrendingMovies = async (searchterm, movie) => {
  try {
    // 🔍 Check if search term already exists
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchterm', searchterm),
    ]);
    // console.log("result:", result);

    if (result.total > 0) {
      // ✅ Found: increment count
      const docId = result.documents[0].$id;
      const count = result.documents[0].count + 1;

      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, docId, {
        count,
      });
    } else {
      // 🆕 Not found: create new entry
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', {
        searchterm,
        title: movie?.Title || "",
        poster: movie?.Poster || "",
        count: 1,
      });
   
      
    }
  } catch (error) {
    console.error("Failed to log trending movie:", error);
  }
};



export const fetchTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc('count'),
      Query.limit(5)
    ]);
    return result.documents;
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    return [];
  }
};

export default logTrendingMovies;
