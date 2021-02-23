function decryptMessage(encryptedMessage, key) {
    const decryptedMessage = encryptedMessage.toUpperCase().split('').map(c => decryptCharacter(c, key)).join('');
    return decryptedMessage;
}

function decryptCharacter(encryptedCharacter, key) {
    const encryptedCode = encryptedCharacter.charCodeAt(0);
    let decryptedCode = encryptedCode - key;
    const minCode = "A".charCodeAt(0);
    const maxCode = "Z".charCodeAt(0);
    if (decryptedCode < minCode) {
        decryptedCode = maxCode - minCode + decryptedCode + 1;
    }
    return Buffer.from([decryptedCode]).toString();
}

console.log(decryptMessage('abc', 3));