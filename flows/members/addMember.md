```mermaid

flowchart TD
A["Require same member address is not exists"]
B["Create a Member instance and add it to the contract"]
C["Set shares with 100,000\n\nAdd totoalContributed\n\nUpdate totalValuePerShare"]
D["Withdraw tokens from new Member to guild Bank"]
E["Emit ProposalFunded()"]
A --> B
B --> C
C --> D
D --> E

```