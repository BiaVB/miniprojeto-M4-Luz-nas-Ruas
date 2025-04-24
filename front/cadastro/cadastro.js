

document.getElementById('formCadastro').addEventListener('submit', async(e) => {
    e.preventDefault()

    const nome = e.target.nome.value;
    const email = e.target.email.value;

    if (!nome || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Envio
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email })
        });

        // Verifica se a resposta foi bem-sucedida (status 2xx)
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        alert(data.mensagem);
    } catch (error) {
        alert("Erro ao enviar dados");
        console.log(error);
    }
});

document.getElementById('verificarConta').addEventListener('click', function() {
    window.location.href = 'verifica/verificar.html';
  });