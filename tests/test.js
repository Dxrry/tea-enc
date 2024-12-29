import TeaEncryptor from '../src/main.js';

try {
    const tea = new TeaEncryptor();
    // tea.set("-<6/Gf>;.y`/xzsiVlrLUK|20DSvdjHF,ObkTIEq4N'3Qch\R7JpuYa15:PXogmW=9Bnw AC_e8MtZ")
    // tea.set("-<6/Gf>;.y`/xzsiVlrLUK|20DSvdjHF,ObkTIEq4N'3Qch\R7JpuYa15:PXogmW=9Bnw AC_e8MtZ", "325")

    const encryptedText = tea.enc("Original Text 1337");
    console.log("Encrypted Text:", encryptedText);

    const decryptedText = tea.dec(encryptedText);
    console.log("Decrypted Text:", decryptedText);

} catch (error) {
    // Error Catcher
    console.error("An error occurred:", error.message);
}