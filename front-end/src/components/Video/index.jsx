import './styles.css'

export default function Videos() {
    return (
        <section>
            <h2>Imagem e Video</h2>
            <img width="560" height="315" src="https://i.pinimg.com/originals/fa/a4/05/faa40583b02983d0ebb00f98b87007df.jpg" alt="Imagem Clone" />

            <iframe width="560" height="315" src="https://www.youtube.com/embed/1ROfSD0eU5E?si=vhlidVSo2oOZ8j0D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </section>
    )
}