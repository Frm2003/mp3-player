export const getInfo = async (bodyRequest: Record<string, FormDataEntryValue | null>) => {
    const url = "http://localhost:3000/audio/info";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
        });

        if (!response.ok) {
            throw new Error("Erro na requisição");
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

export const downloadFile = async (bodyRequest: Record<string, FormDataEntryValue | null>): Promise<void> => {
    const url = "http://localhost:3000/audio/download";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
        });

        if (!response.ok) {
            throw new Error("Erro na requisição");
        }
    } catch (error) {
        throw error;
    }
};

export const streamFile = async () => {
    const url = "http://localhost:3000/audio/stream";

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "audio/webm"
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar o áudio");
        }

        const blob = await response.blob();

        return URL.createObjectURL(blob);
    } catch (error) {
        throw error;
    }
};