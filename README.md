# Web3 Crowdfunding Platform

## About the Project
Traditional crowdfunding platforms often have high fees, centralized control, and potential risks of fund mismanagement. Contributors have to trust the platform and campaign creators without transparency on how the funds are utilized.

This Web3 Crowdfunding Platform leverages blockchain technology to provide a decentralized, transparent, and secure method for raising and managing funds. By using smart contracts, it ensures that funds are released only when predefined conditions are met, reducing risks and increasing trust between campaign creators and contributors.

## Vision
Our vision is to revolutionize crowdfunding by creating a fully decentralized, secure, and transparent fundraising ecosystem where campaign creators and contributors interact directly without intermediaries. This platform ensures fair fund distribution, builds trust, and promotes global accessibility to financial support.

## Project Description
This project is a **decentralized crowdfunding platform** built using **Next.js for the frontend**, **Hardhat for smart contract development**, and **EduChain for deployment**. It allows users to create, contribute to, and track fundraising campaigns securely on the blockchain without intermediaries. The entire system is **gas-free**, ensuring accessibility and cost-effectiveness.

## Features
- **Decentralized Fundraising**: No intermediaries, ensuring security and transparency.
- **Smart Contract-Based Fund Management**: Funds are released only upon meeting conditions.
- **Secure Contributions**: Transactions are recorded on the blockchain for immutability.
- **User-Friendly Interface**: Built with Next.js for a seamless user experience.
- **Gas-Free Transactions**: Using EduChain for cost-free transactions.

## Implementation Steps
### 1. Clone the Repository
```sh
git clone <repository-url>
cd web3-crowdfunding-app
```

### 2. Install Dependencies
```sh
yarn install  # or npm install
```

### 3. Configure Smart Contracts
- Navigate to the `crowdfundingcontracts` folder.
- Deploy contracts using Hardhat:
```sh
npx hardhat compile
npx hardhat deploy
```

### 4. Set Up Environment Variables
Create a `.env` file and configure necessary keys such as blockchain provider URLs and contract addresses.

### 5. Run the Frontend
```sh
yarn dev  # or npm run dev
```
The application will be accessible at `http://localhost:3000`.

## Technologies Used
- **Next.js** – Frontend framework
- **Hardhat** – Smart contract development
- **EduChain** – Gas-free blockchain deployment
- **Tailwind CSS** – UI styling

## Screenshots
![alt text](image-2.png)
![alt text](image-1.png)
![alt text](image.png)


## Contract Address
```
0xf32f5FaAE3024a63E7ef7628fb3f910EC2B8Ed13
```

## Future Enhancements
- Adding social logins for easier access.
- Multi-chain support for broader usability.
- Governance mechanisms for community-driven fund allocation.

## Contributing
Contributions are welcome! Fork the repo, create a new branch, and submit a pull request with your improvements.

## License
This project is licensed under the MIT License.

