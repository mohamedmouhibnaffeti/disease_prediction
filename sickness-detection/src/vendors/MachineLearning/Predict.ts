export default async function Predict ({Symptoms}: {Symptoms?: Array<string>}){
    try {
        const PredictionResponse = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                symptoms: Symptoms
            })
        });

        if (PredictionResponse.ok) {
            const data = await PredictionResponse.json();
            console.log(data)
            return data.predicted_diseases
        } else {
            throw new Error('Failed to fetch');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
