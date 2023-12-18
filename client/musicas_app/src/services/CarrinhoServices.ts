export const fetchCarrinho = async () => {
    try {
      const response = await axios.get<Plano[]>(basePlanosUrl);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Error fetching planos:', error);
      throw error;
    }
  };