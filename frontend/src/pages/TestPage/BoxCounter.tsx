import { Button, styled, Typography } from "@mui/material";
import { useCounter } from "../../store/useCounterStore";

const BoxCounterWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const BoxCounter = () => {
  const { count, increment } = useCounter();

  return (
    <BoxCounterWrapper>
      <Button 
        variant="outlined" 
        color="secondary" 
        onClick={() => increment()}
      >
        count is {count}
      </Button>

      <Typography variant="caption">Edit <code>src/App.tsx</code> and save to test HMR</Typography>
    </BoxCounterWrapper>
  )
}
