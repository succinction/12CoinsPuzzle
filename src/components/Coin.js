import Label from './Label'

function Coin({id, my_index, image_url, label}) {
    const coin_labels = ['1 A', '2 B', '3 C', '4 D', '5 E', '6 F', '7 G', '8 H', '9 I', '10 J', '11 K', '12 L', '13 M', '14 N', '15 O'];
    const labelText = coin_labels[my_index];

    return (
        <div className="coin" id={id}>
            {label && <Label id={"lb" + my_index} label={labelText} />}
            <img id={"cx" + my_index} src={image_url} alt="" />
        </div>
    );
}


export default Coin;