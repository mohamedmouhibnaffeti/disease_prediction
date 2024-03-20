export default async () => {
    try {
        const PredictionResponse = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                symptoms: ['swelling', 'redness', 'tenderness touch', 'pain', 'limited movement joint toe', 'corns calluses']
            })
        });

        if (PredictionResponse.ok) {
            const data = await PredictionResponse.json();
            data.predicted_diseases.map((disease: any, index: number)=>{
                if(index < 4){
                    console.log(disease)
                }
            })
        } else {
            throw new Error('Failed to fetch');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
