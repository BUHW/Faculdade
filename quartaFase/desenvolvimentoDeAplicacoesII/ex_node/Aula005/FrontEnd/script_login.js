document.addEventListener('DOMContentLoaded', () => {
	const signUpForm = document.querySelector('.sign-up-container form');
	const signInForm = document.querySelector('.sign-in-container form');

	const signUpButton = document.getElementById('signUp');
	const signInButton = document.getElementById('signIn');
	const container = document.getElementById('container');

	signUpButton.addEventListener('click', () => {
		container.classList.add("right-panel-active");
	});

	signInButton.addEventListener('click', () => {
		container.classList.remove("right-panel-active");
	});

	signUpForm.addEventListener('submit', async (event) => {
		event.preventDefault();
		const nome = signUpForm.querySelector('input[type="text"]').value;
		const email = signUpForm.querySelector('input[type="email"]').value;
		const pass = signUpForm.querySelector('input[type="password"]').value;

		try {
			const resp = await axios.post('http://localhost:8080/api/dawII/users/', {
				nome,
				email,
				pass
			});
			alert('Usuário criado com sucesso');
			console.log('Usuário criado:', resp.data);

			signUpForm.querySelector('input[type="text"]').value = '';
            signUpForm.querySelector('input[type="email"]').value = '';
            signUpForm.querySelector('input[type="password"]').value = '';

		} catch (err) {
			alert('Erro ao criar usuário: ', err);
		}
	});

	signInForm.addEventListener('submit', async (event) => {
		event.preventDefault();
		const email = signInForm.querySelector('input[type="email"]').value;
		const pass = signInForm.querySelector('input[type="password"]').value;

		try {
			const resp = await axios.post('http://localhost:8080/api/dawII/users/login', {
				email,
				pass
			});

			if (!resp.data.status === 200) {
				alert('E-mail ou senha inválidos');
			}

			alert('Usuário logado com sucesso');
			console.log('Usuário logado:', resp.data);

			signInForm.querySelector('input[type="email"]').value = '';
            signInForm.querySelector('input[type="password"]').value = '';

			window.location.href = 'http://localhost:8080/sucesso.html';

		} catch (err) {
			alert('Erro ao fazer login: ', err);
		}
	});
});