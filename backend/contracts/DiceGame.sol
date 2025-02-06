// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DiceGame {
    address public owner;

    // Événements pour suivre les paris et les résultats
    event BetPlaced(
        address indexed player,
        uint256 betAmount,
        uint256 chosenNumber
    );
    event BetResult(
        address indexed player,
        uint256 rolledNumber,
        uint256 payout
    );

    constructor() {
        owner = msg.sender;
    }

    // Fonction pour jouer
    function rollDice(uint256 chosenNumber) external payable {
        require(msg.value > 0, unicode"La mise doit être supérieure à 0");
        require(
            chosenNumber >= 1 && chosenNumber <= 6,
            unicode"Le numéro choisi doit être entre 1 et 6"
        );

        // Générer un nombre aléatoire entre 1 et 6
        uint256 rolledNumber = (uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    msg.sender,
                    blockhash(block.number - 1)
                )
            )
        ) % 6) + 1;

        emit BetPlaced(msg.sender, msg.value, chosenNumber);

        if (rolledNumber == chosenNumber) {
            // Gain : 5x la mise
            uint256 payout = msg.value * 5;
            require(
                address(this).balance >= payout,
                unicode"Pas assez de fonds dans le contrat"
            );
            payable(msg.sender).transfer(payout);
            emit BetResult(msg.sender, rolledNumber, payout);
        } else {
            emit BetResult(msg.sender, rolledNumber, 0);
        }
    }

    // Fonction pour déposer des fonds dans le contrat (par le propriétaire)
    function depositFunds() external payable onlyOwner {}

    // Fonction pour retirer les fonds du contrat (par le propriétaire)
    function withdrawFunds(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, unicode"Montant trop élevé");
        payable(owner).transfer(amount);
    }

    // ✅ Permet au contrat de recevoir directement des BNB
    receive() external payable {}

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            unicode"Seul le propriétaire peut exécuter cette action"
        );
        _;
    }
}
