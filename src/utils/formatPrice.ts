export default function formatPrice(priceInCents: number) {
	return (priceInCents / 100).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	});
}
