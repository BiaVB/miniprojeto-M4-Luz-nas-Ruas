document.getElementById('formVerificar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const codigo = e.target.codigo.value;

    // Valida se ambos os campos estão preenchidos
    if (!email || !codigo) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // verifica o código
        const response = await fetch('http://localhost:3000/verificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, codigo })
        });

        const data = await response.json();

        // verificação for bem-sucedida
        if (response.ok) {
            alert(data.mensagem); 
        } else {
            alert(data.mensagem); 
        }
    } catch (error) {
        alert("Erro ao verificar a conta.");
        console.log(error);
    }
});