// Stub for RAG Service
// This service will retrieve documents from a vector database

const retrieveDocuments = async (query) => {
    // TODO: Implement vector DB lookup (Pinecone/FAISS)
    console.log(`[RAG] Searching for: ${query}`);

    return [
        { source: "WHO", text: "Verified info about " + query },
        { source: "Ministry of Health", text: "Guidelines on " + query }
    ];
};

module.exports = { retrieveDocuments };
