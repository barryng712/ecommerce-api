const stripe = Stripe('pk_test_51QAQWnKfoHo5oWM0lTLNDQwfzxb4tpIC3rt1tokGYVpfRsX0aSY7tTlnSjVBXnKQQ48LQaMYon5RAO8vBd9nOuZA00HFSgygKn');
const elements = stripe.elements();

const cardElement = elements.create('card');
cardElement.mount('#card-element');

document.querySelector('#payment-form').addEventListener('submit', async (event) =>{
    event.preventDefault();
    const {clientSecret} = await fetch('/api/checkout/payment', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
        },
    }).then((r) => r.json());

    const {error, paymentIntent} = await stripe.confirmCardElement(clientSecret, {
        payment_method:{
            card: cardElement,
            billing_details:{
                name: 'Customer Name',
            },
        },
    });

    if (error){
        console.error('Payment failed', error);
    }else{
        console.log('Payment successful', paymentIntent);
    }
});