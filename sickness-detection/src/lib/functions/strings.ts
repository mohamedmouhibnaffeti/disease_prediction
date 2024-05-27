
const crypto = require('crypto');

export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function encryptToken(token: string, secretKey: string) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

export function decryptToken(encryptedToken: string, secretKey: string) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function returnSpecificBodyParts(bodyPart: string, gender: string){
    switch (bodyPart) {
        case "head": return ["Head", "Brain", "Eyes", "Ears", "Nose", "Mouth", "Jaw", "Lips", "Face", "Scalp", "Hair"];
        case "back_head": return ["Scalp", "Hair"];
        case "neck": return ["Neck", "Throat"];
        case "chest_man": return ["Chest", "Breastbone", "Thorax (Chest)", "Rib Cage"];
        case "chest_woman": return ["Chest", "Breastbone", "Thorax (Chest)", "Rib Cage", "Breasts"];
        case "arms": return ["Arms", "Shoulders", "Elbows", "Forearms", "Wrists", "Hands", "Fingers"];
        case "belly": return ["Abdomen", "Abdominal Cavity", "Pelvis", "Waist", "Groin"];
        case "legs": return ["Legs", "Hips", "Thighs", "Knees", "Calves", "Ankles", "Feet", "Toes"];
        case "back": return ["Back", "Lower back (lumbar spine)"];
        case "butt": return ["Buttocks (Butt)"];
        case "skin": return ["Skin", "Nails"];
        case "private_part_man": return ["Penis", "Scrotum"];
        case "private_part_woman": return ["Vagina", "Labia", "Clitoris"];
        case "systems": return [
            "Musculoskeletal System", "Nervous System", "Endocrine System", 
            gender === "Female" ? "Reproductive System (Female)" : "Reproductive System (Male)", "Urinary System", "Cardiovascular System"
        ];
        case "Musculoskeletal System": return ["Muscles", "Skeletal System", "Bones", "Joints"];
        case "Nervous System": return ["Nerves", "Central Nervous System", "Peripheral Nervous System", "Sensory system"];
        case "Endocrine System": return ["Pituitary gland", "Thyroid gland", "Adrenal glands", "Pancreas"];
        case "Reproductive System_man": return ["Testes"];
        case "Reproductive System_woman": return ["Ovaries", "Uterus"];
        case "Urinary System": return ["Kidneys", "Bladder"];
        case "Cardiovascular System": return ["Heart", "Arteries", "Veins", "Blood", "Blood vessels"];
        default: return [];
    }
}

export function truncateString({str, val}: {str: string, val: number}) {
    if (str.length > val) {
      return str.substring(0, 10) + '...';
    } else {
      return str;
    }
  }
  