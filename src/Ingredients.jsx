export default function Ingredients({data}) {
    return (
        <>
            <ul>
                {
                    Array.from(Array(10).keys()).map((number) => {
                        const ingredient = data[`strIngredient${number + 1}`];
                        const amount = data[`strMeasure${number + 1}`];
                        if (!!ingredient && !!amount) {
                            return (
                                <>
                                    <li>
                                        {`${ingredient} (${amount})`}
                                    </li>
                                </>
                            );
                        }
                    })
                }
            </ul>
        </>
    );

}