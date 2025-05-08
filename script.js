document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

   
    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }


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

    const sections = document.querySelectorAll('main section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            
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

    
    window.addEventListener('click', (event) => {
        if (event.target == budgetModal) {
            budgetModal.style.display = 'none';
        }
    });

    
    if (budgetForm) {
        budgetForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const nome = document.getElementById('nome').value;
            const contato = document.getElementById('contato-form').value;
            const servico = document.getElementById('servico-desejado').value;
            const mensagem = document.getElementById('mensagem-orcamento').value;

            if (!nome || !contato || !servico) {
                alert('Por favor, preencha os campos obrigatórios: Nome, Contato e Serviço Desejado.');
                return;
            }

            alert(`Orçamento Solicitado:\nNome: ${nome}\nContato: ${contato}\nServiço: ${servico}\nMensagem: ${mensagem || 'Nenhuma'}`);
            
            budgetModal.style.display = 'none'; 
            budgetForm.reset(); 
        });
    }
});


window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) { 
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

