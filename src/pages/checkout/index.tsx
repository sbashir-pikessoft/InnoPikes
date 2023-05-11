import Head from "next/head";
import { useState } from "react";
const Checkout = () => {
    const [cardHolder, setCardHolder] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    
    const [expMonth, setExpMonth] = useState<string>("");
    const [expYear, setExpYear] = useState<string>("");
    
    const [cvc, setCvc] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [PaymentType,setPaymentType]=useState("option1");

    const SubmitDetails=()=>{
        const raw = JSON.stringify({
            "cardHolder": cardHolder,
            "cardNumber": cardNumber,
            "expMonth": expMonth,
            "expYear": expYear,  
            "cvc": cvc,
            "amount": amount,
        });
        console.log(raw);
        alert("Data Submitted Successfully!")
    }
    return (
        <>
            <Head>
                <title>Innopikes | Checkout</title>
                <meta name="description" content="Innopikes" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            
            </Head>
            <section className="section pb-0 pt-5" >
                    <div className="container" style={{maxWidth:"-webkit-fill-available"}}>
                        <div className="row">
                            <div className="col-12 text-center">
                                <h2 className="title mt-0">Checkout</h2>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card mt-1">
                                            <div className="card-body">
                                                <div className="card-description">
                                                    <div className="form-check form-check-radio">
                                                        <label className="form-check-label">
                                                            <input className="form-check-input" type="radio" name="cardOptions" value="option1" onChange={(event) => setPaymentType(event.target.value)} checked={PaymentType === 'option1'} />
                                                            <span className="form-check-sign"></span>
                                                            <span style={{ fontSize: "large", marginLeft: "2rem" }}> Credit Card 1</span><br />
                                                            <span style={{ marginLeft: "2rem" }}>*** *** *** 1234</span>
                                                        </label>
                                                        <i className="fab fa-cc-visa" style={{ float: "right", fontSize: "30px" }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card mt-1">
                                            <div className="card-body">
                                                <div className="card-description">
                                                    <div className="form-check form-check-radio">
                                                        <label className="form-check-label">
                                                            <input className="form-check-input" type="radio" name="cardOptions" value="option2" onChange={(event) => setPaymentType(event.target.value)} checked={PaymentType === 'option2'} />
                                                            <span className="form-check-sign"></span>
                                                            <span style={{ fontSize: "large", marginLeft: "2rem" }}> Credit Card 2</span><br />
                                                            <span style={{ marginLeft: "2rem" }}>*** *** *** 4321</span>
                                                        </label>
                                                        <i className="fab fa-cc-mastercard" style={{ float: "right", fontSize: "30px" }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                        <div className="card mt-1">
                                            <div className="card-body">
                                                <div className="card-description">
                                                    <div className="form-check form-check-radio">
                                                        <label className="form-check-label">
                                                            <input className="form-check-input" type="radio" name="cardOptions" value="option3" onChange={(event) => setPaymentType(event.target.value)} checked={PaymentType === 'option3'}  />
                                                            <span className="form-check-sign"></span>
                                                            <span style={{ fontSize: "large", marginLeft: "2rem" }}> Paypal</span><br />
                                                            <span style={{ marginLeft: "2rem" }}>*** *** *** 4321</span>
                                                        </label>
                                                        <i className="fab fa-paypal" style={{ float: "right", fontSize: "30px" }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="card mt-2">
                                    <div className="card-body">
                                        <div className="card-description">
                                            <div className="form-check form-check-radio">
                                                <label className="form-check-label">                                                  
                                                    <span style={{ fontSize: "large"}}>Credit Card details :</span>
                                                </label>
                                                <form className="mt-4">
                                                    <div className="row">
                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <h5 className="mb-1">CardHolder Name</h5>
                                                            <div className="input-group input-lg">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="tim-icons icon-single-02"></i></span>
                                                                </div>
                                                                <input type="text" className="form-control" placeholder="Name" onChange={(event) => setCardHolder(event.target.value)} value={cardHolder}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <h5 className="mb-1">Card Number</h5>
                                                            <div className="input-group input-lg">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="far fa-credit-card"></i></span>
                                                                </div>
                                                                <input type="number" className="form-control" placeholder="Number" onChange={(event) => setCardNumber(event.target.value)} value={cardNumber} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <h5 className="mb-1">EXP Month</h5>
                                                            <div className="input-group input-lg">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>
                                                                </div>
                                                                <input type="number" className="form-control" onChange={(event) => setExpMonth(event.target.value)} value={expMonth}/>
                                                            </div>
                                                        </div>
                                                    
                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <h5 className="mb-1">EXP Year</h5>
                                                            <div className="input-group input-lg">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="far fa-calendar-alt"></i></span>
                                                                </div>
                                                                <input type="number" className="form-control"  onChange={(event) => setExpYear(event.target.value)} value={expYear}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <h5 className="mb-1">CVC</h5>
                                                            <div className="input-group input-lg">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                                                </div>
                                                                <input type="number" className="form-control" placeholder="CVC" onChange={(event) => setCvc(event.target.value)} value={cvc}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <h5 className="mb-1">Amount</h5>
                                                            <div className="input-group input-lg">
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="far fa-money-bill-alt"></i></span>
                                                                </div>
                                                                <input type="number" className="form-control" placeholder="Amount" onChange={(event) => setAmount(event.target.value)} value={amount}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12 mt-3">
                            <button className="btn btn-primary  float-right" onClick={SubmitDetails} >Pay</button>
                        </div>
                        </div>
                    </div>               
            </section>
        </>
    )
}
export default Checkout;