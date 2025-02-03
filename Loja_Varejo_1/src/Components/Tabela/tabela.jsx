import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SelectQTD from '../QTDButton/QTDButton';
import useVendaStore from '../../Zustand/zustand';
import ConfirmarVenda from '../ConfirmarVenda/confirmarVenda';
//import { listarProdutos } from '../../Services/services';
import { httpDelete, httpGet , httpPost, httpPut} from '../../../app';
import Snackbar from '@mui/material/Snackbar';

const StyledTableCell2 = styled(TableCell)(({ theme }) => ({
  '&.low-stock': {
    color: 'red'
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14, 
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TableProducts() {

 

  const [quantities, setQuantities] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false); // Estado para controlar o modal
  const setNomeProduto = useVendaStore((state) => state.setNomeProduto);
  const setQuantidade = useVendaStore((state) => state.setQuantidade);
  const setProdutoPosVenda = useVendaStore((state) => state.setProdutoPosVenda);
  const setPrecoTotal = useVendaStore((state) => state.setPrecoTotal);
  const clearStore = useVendaStore((state) => state.setClearVendaStore);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  //const setFlag = useVendaStore((state) => state.setFlag);
  const flagCounter = useVendaStore((state) => state.flagCounter);

  React.useEffect(() => {
    // Cria a conexão SSE somente quando o componente é montado.
    const eventSource = new EventSource('http://localhost:3000/api/notify');
    eventSource.onopen = (e) => {
      console.log("SSE connection established:", e);
    };

    eventSource.onmessage = (event) => {
      console.log("onmessage event received:", event);
      try {
        const payload = JSON.parse(event.data);
        console.log("Parsed payload (onmessage):", payload);
        useVendaStore.getState().setFlagCounter();
        console.log("flagCounter after onmessage:", useVendaStore.getState().flagCounter);
      } catch (err) {
        console.error("Error parsing onmessage event.data:", err);
      }
    };

    eventSource.addEventListener('change', (event) => {
      console.log("Evento SSE 'change' received:", event);
      try {
        const payload = JSON.parse(event.data);
        console.log("Parsed payload in 'change':", payload);
        useVendaStore.getState().setFlagCounter();
        console.log("flagCounter after 'change':", useVendaStore.getState().flagCounter);
      } catch (err) {
        console.error("Error parsing event.data in 'change':", err);
      }
    });

    /*
    
    // Manipulador para o evento 'change'
    eventSource.addEventListener('change', (event) => {
      console.log("Evento SSE recebido:", event);
      try {
        const payload = JSON.parse(event.data);
        console.log("Payload SSE:", payload);
      } catch (err) {
        console.error("Erro ao parsear o event.data:", err);
      }

      const flag = JSON.parse(event.data);
      useVendaStore.getState().setFlagCounter();
      // Se necessário, atualize o estado local:
      // setSseData(flag);
    });

    */

    // Manipulador de erros
    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      // Opcional: reconectar ou tratar o erro conforme sua lógica
    };

    // Cleanup: fecha a conexão quando o componente for desmontado.
    return () => {
      eventSource.close();
      console.log('SSE connection closed');
    };
  }, []);


  //Escopo Tabela
  const [produtos, setProdutos] = React.useState([]);
  
  const handleChangeQuantity = (produtoId, quantidade) => {
    setQuantities((prev) => ({
      ...prev,
      [produtoId]: quantidade,
    }));
  };

  const handleRegistrarVenda = (produto) => {
    const quantidade = quantities[produto._id] || 0;

    if (quantidade === 0) {
      setSnackbarMessage("Por favor, selecione a quantidade antes de registrar a venda.");
      setSnackbarOpen(true); // Exibe o aviso no Snackbar
      return;
    }
    setNomeProduto(produto.nomeProduto);
    setQuantidade(quantidade);
    setPrecoTotal(produto.preco * quantidade);
    const produtoAtualizado = { ...produto };
    produtoAtualizado.quantidade -= quantidade;
    setProdutoPosVenda(produtoAtualizado);

    const estadoAtual = useVendaStore.getState();
    setOpenModal(true);
    console.log(`Produto: ${produto}, Quantidade: ${quantidade}`);
    console.log("Estado atual do Zustand:", estadoAtual); 
  };


  /*const nomeLoja = {
    loja: "LojaA"
  }*/


  
  //Escopo Tabela


  //POST
  /*
  React.useEffect(() => { 
    //Popula a cache
    async function fetchProdutos() {
      try {
        console.log("To em fetchProdutos 1");
        const response = await httpGet(
          //colocar baseurl
          'http://localhost:3000/api/produtos',
          {
            headers: 
              {
                nomeloja: "Loja A"
              }
          }
        ); // URL do seu backend
        console.log("To em fetchProdutos 2");
        console.log("Response fetchProdutos:", response); // Exibe os dados no console
        setProdutos(response); // Atualiza o estado com os dados retornados
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProdutos([]); 
      }
  };

  async function postProdutos() {
    try {
      console.log("To em postProdutos 1");
      const produto = { 
        nome: "Exemplo 3",
        preco: 0.1,
        quantidade: 3,
        estoqueMin: 5,
        nomeLoja: 'Loja A'
      };
      const response = await httpPost(
        //colocar baseurl
        'http://localhost:3000/api/produtos', produto); // URL do seu backend
      console.log("To em postProdutos 2");
      console.log("Response postProdutos:", response); // Exibe os dados no console
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    }
  };
  fetchProdutos();
  postProdutos();
  }, []);*/




  //PUT
  /*
  React.useEffect(() => {
  //Popula a cache
  async function fetchProdutos() {
    try {
      console.log("To em fetchProdutos 1");
      const response = await httpGet(
        //colocar baseurl
        'http://localhost:3000/api/produtos',
        {
          headers: 
            {
              nomeloja: "Loja A"
            }
        }
      ); // URL do seu backend
      console.log("To em fetchProdutos 2");
      //setProdutos(response); // Atualiza o estado com os dados retornados
      console.log("Response fetchProdutos:", response); // Exibe os dados no console
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    }
  };


  async function atualizarProdutos() {
    try {
      console.log("To em atualizarProdutos 1");
      const produto = { 
        nome: "Teste 1",
        preco: 0.8,
        quantidade: 8,
        estoqueMin: 5,
        nomeLoja: 'Loja A'
      };
      const response = await httpPut(
        //colocar baseurl
        'http://localhost:3000/api/produtos/6796de88d457deb4e83396b9', produto); // URL do seu backend
      console.log("To em atualizarProdutos 2");
      setProdutos(response); // Atualiza o estado com os dados retornados
      console.log("Response atualizarProdutos:", response); // Exibe os dados no console
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    }
  };
  fetchProdutos();
  atualizarProdutos();
  }, []);*/




  //DELETE
  /*
  React.useEffect(() => {
  //Popula a cache
  async function fetchProdutos() {
    try {
      console.log("To em fetchProdutos 1");
      const response = await httpGet(
        //colocar baseurl
        'http://localhost:3000/api/produtos',
        {
          headers: 
            {
              nomeloja: "Loja A"
            }
        }
      ); // URL do seu backend
      console.log("To em fetchProdutos 2");
      //setProdutos(response); // Atualiza o estado com os dados retornados
      console.log("Response fetchProdutos:", response); // Exibe os dados no console
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    }
  };

  async function deleteProdutos() {
    try {
      console.log("To em deleteProdutos 1");
      const response = await httpDelete(
        //colocar baseurl
        'http://localhost:3000/api/produtos/6796f2c3465937768f510a24'); // URL do seu backend
      console.log("To em deleteProdutos 2");
      setProdutos(response); // Atualiza o estado com os dados retornados
      console.log("Response deleteProdutos:", response); // Exibe os dados no console
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    };
  };
  fetchProdutos();
  deleteProdutos();
  }, []);*/





//PUT
/*React.useEffect(() => {
  async function fetchProdutos() {
    try {
      console.log("To em fetchProdutos 1");
      const produto = { 
        nome: "Qualquer COISA88184",
        preco: 5,
        quantidade: 1,
        estoqueMin: 5,
        nomeLoja: 'Loja A'
      };
      console.log("Teste:", produto)
      const response = await httpPut(

        //colocar baseurl
        'http://localhost:3000/api/produtos/6796d35b1f4442da34d88184', produto); // URL do seu backend
      console.log("To em fetchProdutos 2");
      setProdutos(response); // Atualiza o estado com os dados retornados
      console.log("Response:", response); // Exibe os dados no console
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    };
  }
  fetchProdutos();
  }, []);*/
/*
  async function notifyProdutos() {
    try {
      console.log("To em notifyProdutos 1");
      const response = await httpGet(
        //colocar baseurl
        'http://localhost:3000/api/notify',
        {
          headers:
            { 
              nomeLoja: 'Loja A' 
            }
        }
      ); // URL do seu backend
      console.log("To em notifyProdutos 2");
      setProdutos(response); // Atualiza o estado com os dados retornados
      console.log("Response notifyProdutos:", response.event); // Exibe os dados no console
      //console.log("\n\n\nFETCH Produtos TOKEN:", localStorage.getItem('token'))
      //const data = await listarProdutos();
      //console.log("Produtos encontrados:", data);
      //setProdutos(data.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    }
  }
    */

  async function fetchProdutos() {
    try {
      console.log("To em fetchProdutos 1");
      const response = await httpGet(
        //colocar baseurl
        'http://localhost:3000/api/produtos',
        {
          headers:
            { 
              nomeLoja: 'Loja A' 
            }
        }
      ); // URL do seu backend
      console.log("To em fetchProdutos 2");
      setProdutos(response); // Atualiza o estado com os dados retornados
      console.log("Response fetchProdutos:", response); // Exibe os dados no console
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setProdutos([]); 
    }
  }
  
  //GET
  React.useEffect(() => {
    if (openModal) {
      setOpenModal(false);
      setSnackbarMessage("Um produto sofreu alteração. Por favor, tente novamente.");
      setSnackbarOpen(true);
      clearStore();
    }
  setQuantities(0);
  fetchProdutos();
  console.log("FLAG DENTRO DE USEFFECT DEPOIS FETCH: ",flagCounter);
  }, [flagCounter]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Produtos</StyledTableCell>
              <StyledTableCell align="right">Estoque / Estoque Min.</StyledTableCell>
              <StyledTableCell align="right">Preço unitário</StyledTableCell>
              <StyledTableCell align="right">Qtd para venda</StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.nomeProduto}
                </StyledTableCell>
                <StyledTableCell2 align="right" className={row.quantidade < row.estoqueMin ? 'low-stock' : ''}>
                {row.quantidade} / {row.estoqueMin}
              </StyledTableCell2>
                <StyledTableCell align="right">
                  {row.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SelectQTD
                    onChangeQuantity={(quantidade) => handleChangeQuantity(row._id, quantidade) }
                    maxQuantidade= {row.quantidade}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleRegistrarVenda(row)}
                  >
                    Registrar Venda
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Passa o estado openModal e o método handleCloseModal para o componente ConfirmarVenda */}
      <ConfirmarVenda open={openModal} handleClose={() => setOpenModal(false)} showSnackbar={showSnackbar} />
         {/* Snackbar para o aviso */}
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbarOpen(false)}
      message= {snackbarMessage}
    />
  </>
);
}