# Smart Contract Monitoring Setup

## Requirements
1. OpenZeppelin Defender account
2. Environment variables set:
   - `DEFENDER_API_KEY`
   - `DEFENDER_API_SECRET`

## Setup Instructions
1. Install Defender CLI:
```bash
npm install -g @openzeppelin/defender-cli
```

2. Deploy monitoring:
```bash
defender deploy --config defender-config.json --network polygon
```

## Monitored Events
- Contract pause/unpause
- Critical parameter changes
- Ownership transfers

## Alert Channels
- Email
- Slack (configured in Defender console)
