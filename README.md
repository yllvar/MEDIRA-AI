# MEDIRA Healthcare Platform

<div align="center">

![MEDIRA Logo](https://via.placeholder.com/200x60/0EA5E9/FFFFFF?text=MEDIRA)

**AI-Powered, Blockchain-Secured Healthcare Platform**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com/)
[![Polygon](https://img.shields.io/badge/Polygon-Blockchain-purple)](https://polygon.technology/)
[![Together AI](https://img.shields.io/badge/Together_AI-Llama_3-orange)](https://together.ai/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database Setup](#database-setup)
- [Blockchain Integration](#blockchain-integration)
- [AI Integration](#ai-integration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security & HIPAA Compliance](#security--hipaa-compliance)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

MEDIRA is a next-generation healthcare platform that combines cutting-edge AI diagnostics with blockchain-secured medical records. Built with modern web technologies, MEDIRA empowers patients with complete control over their medical data while providing healthcare professionals with powerful AI-assisted diagnostic tools.

### Key Highlights

- **Patient-Centric**: Patients control who accesses their medical records via blockchain
- **AI-Powered**: Llama 3 models provide diagnostic support and treatment recommendations
- **Blockchain-Secured**: Immutable audit trails on Polygon ensure data integrity
- **HIPAA Compliant**: Built with security and privacy at the core
- **Modern Stack**: Next.js 16, React 19, Supabase, and Tailwind CSS v4

---

## ✨ Features

### For Patients

- **Secure Medical Records Management**
  - Upload and store medical records with AES-256-GCM encryption
  - View complete medical history with timeline visualization
  - Download records in multiple formats

- **Access Control**
  - Grant/revoke doctor access via blockchain smart contracts
  - Set expiration dates for temporary access
  - View complete audit trail of all data access

- **Appointment Management**
  - Book appointments with available doctors
  - View upcoming and past appointments
  - Receive appointment reminders

- **Health Dashboard**
  - Quick overview of health metrics
  - Recent test results and trends
  - Medication tracking

### For Doctors

- **Patient Management**
  - View authorized patient list
  - Access patient medical records (with blockchain verification)
  - Track patient visit history

- **AI Diagnostic Assistant**
  - Input symptoms and patient history
  - Receive AI-generated differential diagnoses
  - Get evidence-based treatment recommendations
  - View probability-ranked condition assessments

- **Appointment Scheduling**
  - Manage daily schedule
  - Accept/decline appointment requests
  - Add visit notes and prescriptions

- **Analytics Dashboard**
  - Patient statistics and trends
  - Appointment analytics
  - Performance metrics

### For Administrators

- **User Management**
  - Verify doctor credentials
  - Manage user roles and permissions
  - Monitor platform usage

- **Audit & Compliance**
  - View blockchain audit trails
  - Generate compliance reports
  - Monitor security events

---

## 🏗️ Architecture

### System Architecture

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│         Next.js 16 App Router (React 19)                │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Server     │  │  API Routes  │  │   Server     │ │
│  │  Components  │  │              │  │   Actions    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────┐
│                   Service Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Supabase   │  │  Together AI │  │  Blockchain  │ │
│  │ (All-in-One) │  │  (Llama 3)   │  │  (Polygon)   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
\`\`\`

### Data Flow

1. **User Authentication**: Supabase Auth handles secure login/registration
2. **Data Storage**: Medical records encrypted and stored in Supabase PostgreSQL
3. **Blockchain Verification**: Record hashes and access grants stored on Polygon
4. **AI Processing**: Together AI analyzes symptoms and generates recommendations
5. **Real-time Updates**: Supabase Realtime for live appointment notifications

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19.2
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State Management**: React Server Components + Supabase Realtime
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

### Backend
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **API**: Next.js API Routes + Server Actions

### AI & Blockchain
- **AI Provider**: Together AI
- **AI Model**: meta-llama/Llama-3-70b-chat-hf
- **Blockchain**: Polygon (Mumbai Testnet)
- **Smart Contracts**: Solidity 0.8.24 + Hardhat
- **Web3 Library**: ethers.js v6

### DevOps
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20+ and npm
- **Git** for version control
- **Supabase Account** (free tier available)
- **Together AI API Key** (sign up at together.ai)
- **Polygon Mumbai Testnet Wallet** (MetaMask recommended)
- **Test MATIC** (get from Mumbai faucet)

### Installation

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/medira.git
cd medira
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` with your actual credentials (see [Environment Variables](#environment-variables) section).

4. **Run database migrations**

- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Run the scripts in the `scripts/` folder in order:
  1. `01-create-schema.sql` - Creates tables and indexes
  2. `02-enable-rls.sql` - Enables Row Level Security policies

5. **Start the development server**

\`\`\`bash
npm run dev
\`\`\`

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database (Optional - for direct connections)
SUPABASE_POSTGRES_URL=your_postgres_connection_string
SUPABASE_POSTGRES_PRISMA_URL=your_postgres_prisma_url
SUPABASE_POSTGRES_URL_NON_POOLING=your_postgres_non_pooling_url

# Together AI
TOGETHER_API_KEY=your_together_ai_api_key

# Blockchain (Polygon Mumbai Testnet)
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
MEDICAL_RECORDS_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_CHAIN_ID=80001

# Encryption (Generate with: openssl rand -hex 32)
ENCRYPTION_KEY=your_64_character_hex_encryption_key

# Optional: For development redirects
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

See `.env.example` for a complete template.

---

## 🗄️ Database Setup

### Schema Overview

The database consists of the following main tables:

- **profiles**: User profiles with role information
- **patient_profiles**: Patient-specific data (DOB, allergies, conditions)
- **doctor_profiles**: Doctor credentials and specializations
- **medical_records**: Encrypted medical records with blockchain references
- **access_grants**: Blockchain-verified access permissions
- **appointments**: Appointment scheduling data
- **audit_logs**: System audit trail

### Running Migrations

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for database provisioning

2. **Run SQL Scripts**
   - Open Supabase SQL Editor
   - Copy and paste `scripts/01-create-schema.sql`
   - Click "Run"
   - Repeat for `scripts/02-enable-rls.sql`

3. **Verify Setup**
   - Go to Table Editor
   - Confirm all tables are created
   - Check that RLS is enabled on all tables

### Row Level Security (RLS)

RLS policies ensure data isolation:

- **Patients** can only view/edit their own records
- **Doctors** can view patient records only with active access grants
- **Admins** have elevated permissions for management tasks

---

## ⛓️ Blockchain Integration

### Smart Contract Deployment

1. **Install Hardhat** (if not already installed)

\`\`\`bash
npm install --save-dev hardhat
\`\`\`

2. **Compile Contracts**

\`\`\`bash
cd blockchain
npx hardhat compile
\`\`\`

3. **Deploy to Mumbai Testnet**

\`\`\`bash
npx hardhat run scripts/deploy.ts --network mumbai
\`\`\`

4. **Update Environment Variables**

Copy the deployed contract address to your `.env.local`:

\`\`\`bash
MEDICAL_RECORDS_CONTRACT_ADDRESS=0x...
\`\`\`

### Smart Contract Functions

- `addRecord(bytes32 dataHash)`: Store medical record hash
- `grantAccess(address doctor, uint256 expiresAt)`: Grant doctor access
- `revokeAccess(address doctor)`: Revoke doctor access
- `hasAccess(address patient, address doctor)`: Check access status

### Blockchain Features

- **Immutable Audit Trail**: All access events recorded on-chain
- **Patient Control**: Only patients can grant/revoke access
- **Expiration Support**: Set time-limited access permissions
- **Gas Optimization**: Minimal on-chain storage for cost efficiency

---

## 🤖 AI Integration

### Together AI Setup

1. **Get API Key**
   - Sign up at [together.ai](https://together.ai)
   - Navigate to API Keys section
   - Generate a new API key

2. **Add to Environment**

\`\`\`bash
TOGETHER_API_KEY=your_api_key_here
\`\`\`

### AI Features

#### Diagnostic Analysis
- Input patient symptoms and medical history
- Receive differential diagnosis with probability rankings
- Get recommended diagnostic tests
- View urgency level assessment

#### Treatment Recommendations
- Evidence-based treatment suggestions
- Medication recommendations with dosages
- Lifestyle modification advice
- Follow-up care guidelines

### AI Models Used

- **Primary**: `meta-llama/Llama-3-70b-chat-hf` (diagnostic analysis)
- **Temperature**: 0.3 (lower for medical accuracy)
- **Max Tokens**: 1500-2000 (comprehensive responses)

### Rate Limiting

- **Default**: 100 requests per hour per user
- Configurable in `lib/ai-diagnostics.ts`

---

## 📁 Project Structure

\`\`\`
medira/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   │   ├── login/               # Login page
│   │   └── register/            # Registration page
│   ├── patient/                 # Patient portal
│   │   ├── dashboard/           # Patient dashboard
│   │   ├── appointments/        # Appointment management
│   │   ├── records/             # Medical records
│   │   └── access/              # Access control
│   ├── doctor/                  # Doctor portal
│   │   ├── dashboard/           # Doctor dashboard
│   │   ├── patients/            # Patient list
│   │   ├── appointments/        # Appointment schedule
│   │   └── ai-diagnostics/      # AI diagnostic tool
│   ├── admin/                   # Admin dashboard
│   ├── api/                     # API routes
│   │   ├── ai/                  # AI endpoints
│   │   ├── appointments/        # Appointment APIs
│   │   └── blockchain/          # Blockchain APIs
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   ├── ui/                      # shadcn/ui components
│   ├── patient-nav.tsx          # Patient navigation
│   └── doctor-nav.tsx           # Doctor navigation
├── lib/                         # Utility libraries
│   ├── supabase/                # Supabase clients
│   │   ├── client.ts            # Browser client
│   │   └── server.ts            # Server client
│   ├── blockchain.ts            # Blockchain service
│   ├── ai-diagnostics.ts        # AI service
│   └── types.ts                 # TypeScript types
├── scripts/                     # Database scripts
│   ├── 01-create-schema.sql     # Schema creation
│   └── 02-enable-rls.sql        # RLS policies
├── blockchain/                  # Smart contracts (optional)
│   ├── contracts/               # Solidity contracts
│   ├── scripts/                 # Deployment scripts
│   └── hardhat.config.ts        # Hardhat configuration
├── .env.example                 # Environment template
├── .env.local                   # Local environment (gitignored)
├── middleware.ts                # Auth middleware
├── next.config.mjs              # Next.js config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
\`\`\`

---

## 📡 API Documentation

### Authentication

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securepassword",
  "fullName": "John Doe",
  "role": "patient"
}
\`\`\`

**Response:**
\`\`\`json
{
  "user": { "id": "...", "email": "..." },
  "session": { "access_token": "..." }
}
\`\`\`

### Medical Records

#### GET `/api/records`
Get all medical records for authenticated user.

**Headers:**
\`\`\`
Authorization: Bearer {access_token}
\`\`\`

**Response:**
\`\`\`json
{
  "records": [
    {
      "id": "...",
      "title": "Blood Test Results",
      "recordType": "lab_result",
      "recordDate": "2024-01-15T10:00:00Z",
      "dataHash": "0x..."
    }
  ]
}
\`\`\`

### AI Diagnostics

#### POST `/api/ai/analyze`
Analyze symptoms and generate diagnostic recommendations.

**Request Body:**
\`\`\`json
{
  "symptoms": ["fever", "cough", "fatigue"],
  "patientHistory": {
    "age": 35,
    "gender": "male",
    "conditions": ["asthma"],
    "medications": ["albuterol"]
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "analysis": {
    "conditions": [
      {
        "name": "Upper Respiratory Infection",
        "probability": 0.75,
        "reasoning": "..."
      }
    ],
    "recommendedTests": ["CBC", "Chest X-ray"],
    "urgencyLevel": "routine"
  }
}
\`\`\`

### Blockchain

#### POST `/api/blockchain/grant-access`
Grant doctor access to medical records.

**Request Body:**
\`\`\`json
{
  "doctorId": "doctor-uuid",
  "expiresAt": "2024-12-31T23:59:59Z"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "txHash": "0x...",
  "blockNumber": 12345
}
\`\`\`

---

## 🔒 Security & HIPAA Compliance

### Data Encryption

- **At Rest**: AES-256-GCM encryption for all medical records
- **In Transit**: TLS 1.3 for all network communications
- **Key Management**: Environment-based encryption keys

### Access Control

- **Row Level Security**: Database-level access policies
- **Blockchain Verification**: Immutable access grants
- **Role-Based Access**: Patient, Doctor, Admin roles
- **Session Management**: Secure JWT tokens with automatic refresh

### Audit Logging

- **Database Logs**: All data access logged in `audit_logs` table
- **Blockchain Logs**: Immutable on-chain access events
- **IP Tracking**: Request origin tracking for security
- **User Agent**: Device and browser information

### HIPAA Compliance Checklist

- ✅ **Access Controls**: Role-based with RLS enforcement
- ✅ **Audit Trails**: Comprehensive logging on blockchain
- ✅ **Data Encryption**: AES-256-GCM at rest, TLS 1.3 in transit
- ✅ **Data Integrity**: SHA-256 hashes on blockchain
- ✅ **Patient Rights**: Blockchain-based access control
- ✅ **Breach Notification**: Automated security alerts
- ✅ **Data Backup**: Supabase automated backups
- ✅ **Session Management**: Secure token handling

### Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Rotate API keys** regularly
3. **Use strong passwords** for all accounts
4. **Enable 2FA** on Supabase and Vercel
5. **Monitor audit logs** for suspicious activity
6. **Keep dependencies updated** with `npm audit`

---

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**

\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   - Add all variables from `.env.local`
   - Use Vercel's environment variable UI
   - Set production values (not development)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your production URL

### Database Migration

Supabase database is already in production mode. No additional migration needed.

### Blockchain Deployment

For production, deploy to Polygon mainnet:

\`\`\`bash
npx hardhat run scripts/deploy.ts --network polygon
\`\`\`

Update `MEDICAL_RECORDS_CONTRACT_ADDRESS` with mainnet address.

### Post-Deployment Checklist

- ✅ Verify all environment variables are set
- ✅ Test authentication flow
- ✅ Verify database connections
- ✅ Test blockchain transactions
- ✅ Verify AI API calls
- ✅ Check SSL certificate
- ✅ Enable Vercel Analytics
- ✅ Set up custom domain (optional)

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
   \`\`\`bash
   git commit -m "feat: add patient medication tracking"
   \`\`\`
6. **Push to your fork**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`
7. **Open a Pull Request**

### Code Style

- Use TypeScript for all new code
- Follow existing code formatting (Prettier)
- Write meaningful variable names
- Add comments for complex logic
- Include JSDoc for functions

### Testing

- Test all new features locally
- Verify database migrations
- Test blockchain interactions on testnet
- Ensure mobile responsiveness

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Supabase** for the all-in-one backend
- **Together AI** for powerful AI models
- **Polygon** for scalable blockchain infrastructure
- **shadcn/ui** for beautiful UI components

---

## 📞 Support

For questions, issues, or feature requests:

- **GitHub Issues**: [github.com/yourusername/medira/issues](https://github.com/yourusername/medira/issues)
- **Email**: support@medira.app
- **Documentation**: [docs.medira.app](https://docs.medira.app)

---

<div align="center">

**Built with ❤️ for better healthcare**

[Website](https://medira.app) • [Documentation](https://docs.medira.app) • [GitHub](https://github.com/yourusername/medira)

</div>
\`\`\`

```bash file="" isHidden
