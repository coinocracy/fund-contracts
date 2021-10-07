```mermaid

flowchart TD
A["Update totalWithdrawals"]
B["Withdraw allowed Dividends tokens from guild Bank to this member"]
C["Emit DividendWithdrawn()"]
A --> B
B --> C

```