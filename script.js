document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spin-button');
    const remainingSpinsDisplay = document.getElementById('remaining-spins');
    const resultDisplay = document.getElementById('result');

    // Simulated user data (replace with actual API calls)
    let remainingSpins = 3; // Example: user has 3 spins
    let totalSpinsEarned = 0;

    // Update remaining spins display
    remainingSpinsDisplay.textContent = remainingSpins;
    if (remainingSpins > 0) {
        spinButton.disabled = false;
    }

    // Prizes based on the campaign
    const prizes = [
        '5 USDT Bonus',
        '10 USDT Bonus',
        '15 USDT Bonus',
        '20 USDT Bonus',
        '10% Cashback (7 Days)',
        '0.001 BTC',
        '50 BMX Tokens',
        '100 BMX Tokens'
    ];

    // Spin the wheel
    spinButton.addEventListener('click', () => {
        if (remainingSpins <= 0) return;

        // Disable button during spin
        spinButton.disabled = true;
        remainingSpins--;
        totalSpinsEarned++;
        remainingSpinsDisplay.textContent = remainingSpins;

        // Random prize selection
        const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
        const sectionAngle = 360 / prizes.length;
        
        // Calculate angle needed to align the selected prize at the top
        // Add 1080 (3 full spins) + angle needed to align prize at top
        // Subtract 22.5 degrees to align with the center of the section
        const targetAngle = 1080 + (randomPrizeIndex * sectionAngle) - 22.5;
        wheel.style.transform = `rotate(${targetAngle}deg)`;

        setTimeout(() => {
            // Since wheel rotates clockwise, we need to get the opposite index
            const actualPrizeIndex = (8 - randomPrizeIndex) % 8;
            const prize = prizes[actualPrizeIndex];

            // Display result
            resultDisplay.textContent = `Congratulations! You won: ${prize}`;

            // Re-enable button if spins remain
            if (remainingSpins > 0) {
                spinButton.disabled = false;
            }

            // Check for grand prize eligibility
            if (totalSpinsEarned >= 3) {
                resultDisplay.innerHTML += '<br>You are now eligible for the 0.1 BTC Grand Prize Draw!';
            }
        }, 3000);
    });
});

// Copy referral link function
function copyReferralLink() {
    const referralLink = document.getElementById('referral-link').textContent;
    navigator.clipboard.writeText(referralLink).then(() => {
        alert('Referral link copied to clipboard!');
    });
}