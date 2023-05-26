export const createBook = (newBook) => {
    return (dispatch) => {
      // Aqui você pode fazer qualquer lógica necessária antes de enviar os dados para o servidor
      // Por exemplo, você pode realizar uma requisição HTTP para enviar os dados para o backend
  
      // Simulando uma requisição assíncrona com setTimeout
      setTimeout(() => {
        // Aqui você pode adicionar a lógica para enviar os dados do novo book para o servidor
        // Por exemplo, fazer uma requisição POST para uma API
  
        // Após enviar os dados com sucesso, você pode despachar uma ação para atualizar o estado do Redux
        dispatch({ type: 'BOOK_CREATED', payload: newBook });
      }, 2000); // Tempo de espera simulado de 2 segundos
    };
  };
  