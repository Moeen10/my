import React from 'react';
import "./Single.css"
const Single = (props) => {
    const {amount,bus,place} =props.all
    return (
        <div>
          


<div class="box effect8">
<h3>Amount : {amount}</h3>
<h3>Bus Name : {bus}</h3>
<h3>Place : {place}</h3>
</div>
        </div>
    );
};

export default Single;