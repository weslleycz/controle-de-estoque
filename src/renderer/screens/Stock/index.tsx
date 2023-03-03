import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { Header } from 'renderer/components/molecules/Header';
import { Menu } from 'renderer/components/molecules/Menu';
import "./style.scss";

const produtos = {
  yhjjj: {
    name: 'Bala Fini Tubes Morango 80g',
    price: 612,
    code_bar: 'yhjjj',
    quantity: 45,
  },
  ggfdd: {
    name: 'Salgadinho Ruffles Original  92g',
    price: 799,
    code_bar: 'ggfdd',
    quantity: 45,
  },
};

export const Stock = () => {
  const [list, setList] = useState(Object.entries(produtos));

  const handleFilter = (valor: string) => {
    if (valor != '') {
      setList(
        list.filter((produto) => {
          if (produto[1].name.toLowerCase().includes(valor.toLowerCase())) {
            return true;
          } else if (
            produto[1].code_bar.toLowerCase().includes(valor.toLowerCase())
          ) {
            return true;
          }
        })
      );
    } else {
      setList(Object.entries(produtos));
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4} md={2}>
          <Menu />
        </Grid>
        <Grid item xs={30} md={10}>
          <Header title="Estoque" />
          <Box className="conteiner">
          <Stack
            padding={2}
            marginLeft={5}
            marginRight={5}
            direction="row"
            spacing={55}
          >
            <Paper
              sx={{
                p: '10px 5px',
                display: 'flex',
                alignItems: 'center',
                width: '40%',
              }}
            >
              <InputBase
                onChange={(e) => handleFilter(e.target.value)}
                sx={{ width: 400, marginLeft: 2 }}
                placeholder="Nome ou código de barras"
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Button size="medium" variant="contained" startIcon={<AddIcon />}>
              Produto
            </Button>
          </Stack>
          </Box>
          {list.map((produto) => (
            <div key={produto[1].code_bar}>{produto[1].name}</div>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
