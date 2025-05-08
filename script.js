document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

   
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                if (navUl && navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                }
            }
        });
    });

    // Animações ao rolar (exemplo simples de fade-in para seções)
    const sections = document.querySelectorAll('main section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // observer.unobserve(entry.target); // Descomente para animar apenas uma vez
            }
        });
    };

    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Controle do Modal de Orçamento
    const budgetModal = document.getElementById('budgetModal');
    const openBudgetModalButton = document.getElementById('openBudgetModal');
    const closeBudgetModalButton = document.getElementById('closeBudgetModal');
    const budgetForm = document.getElementById('budgetForm');

    if (openBudgetModalButton && budgetModal) {
        openBudgetModalButton.addEventListener('click', () => {
            budgetModal.style.display = 'block';
        });
    }

    if (closeBudgetModalButton && budgetModal) {
        closeBudgetModalButton.addEventListener('click', () => {
            budgetModal.style.display = 'none';
        });
    }

    // Fechar modal clicando fora
    window.addEventListener('click', (event) => {
        if (event.target == budgetModal) {
            budgetModal.style.display = 'none';
        }
    });

    // Manipulação do formulário de orçamento
    if (budgetForm) {
        budgetForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário
            const nome = document.getElementById('nome').value;
            const contato = document.getElementById('contato-form').value;
            const servico = document.getElementById('servico-desejado').value;
            const mensagem = document.getElementById('mensagem-orcamento').value;

            if (!nome || !contato || !servico) {
                alert('Por favor, preencha os campos obrigatórios: Nome, Contato e Serviço Desejado.');
                return;
            }

            // Aqui você pode adicionar a lógica para enviar os dados do formulário
            // Por exemplo, usando fetch() para uma API, ou integrando com um serviço de email.
            // Por enquanto, vamos apenas mostrar um alerta com os dados.
            alert(`Orçamento Solicitado:\nNome: ${nome}\nContato: ${contato}\nServiço: ${servico}\nMensagem: ${mensagem || 'Nenhuma'}`);
            
            budgetModal.style.display = 'none'; // Fecha o modal após o envio (simulado)
            budgetForm.reset(); // Limpa o formulário
        });
    }
});

// Adicionar classe ao header ao rolar a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) { // Verifica se o header existe
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

