import app from "./app";
import { syncTMDBData } from "./services/tmdbSync";

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    
    // Sincronização inicial (opcional)
    if (process.env.NODE_ENV !== "production") {
        await syncTMDBData();
    }
});