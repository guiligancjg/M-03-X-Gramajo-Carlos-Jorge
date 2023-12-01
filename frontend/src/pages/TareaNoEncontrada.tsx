const TareaNoEncontrada = () => {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    fontFamily: 'Arial, sans-serif',
                }}
            >
                <h1 style={{ fontSize: '3em', marginBottom: '20px' }}>Tarea No Encontrada</h1>
                <p style={{ fontSize: '1.5em' }}>Lo sentimos, la tarea que estás buscando no ha sido encontrada.</p>
            </div>

        </>
    )
}

export default TareaNoEncontrada