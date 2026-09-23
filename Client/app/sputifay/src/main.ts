import './style.css'
import { cancons } from './data/canco'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<h1>Sputifay</h1>
<p>${cancons[0].titol}</p>
`