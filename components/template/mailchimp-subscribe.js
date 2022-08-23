import { useState, useEffect } from 'react'
import MailchimpSubscribe from "react-mailchimp-subscribe"
const url = "https://gmail.us12.list-manage.com/subscribe/post?u=241c93836cd2e4d32354233a8&amp;id=dda2796677";

const RadioButton = ({ label, value, onChange, required }) => {
  return (
    <label>
      <input required className="mr-2" type="radio" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};

const CustomForm = ({ status, message, onValidated }) => {
  const [value, setValue] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleChange = (val) => {
    setValue(val);
  };

  useEffect(() => {
    if (status === 'success') {
      setEmail('')
      setFirstName('')
      setLastName('')
      setValue(false)
    }
  }, [status])

  const submit = () => {
    email &&
    firstName &&
    lastName &&
    email.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email,
      FNAME: firstName,
      LNAME: lastName,
      MMERGE5: value
    });
  }
  return (
    <form onSubmit={(e) => {e.preventDefault(); submit()}}>
      <div className="text-left">
        <div className="w-full">
          <span className="inline-block mr-2 text-xs mb-2 mt-4">01 FIRST NAME</span>
          <input
            className="border-b text-dark border-dark py-2 px-4 w-full outline-none rounded-none"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            placeholder="First Name"
            required
          />
        </div>
        <div className="w-full">
          <span className="inline-block mr-2 text-xs mb-2 mt-4">02 LAST NAME</span>
          <input
            className="border-b text-dark border-dark py-2 px-4 w-full outline-none rounded-none"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="w-full">
          <span className="inline-block mr-2 text-xs mb-2 mt-4">03 YOUR EMAIL</span>
          <input
            className="border-b text-dark border-dark py-2 px-4 w-full outline-none rounded-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="w-full">
          <span className="inline-block mr-2 text-xs mb-2 mt-4">04 WHO ARE YOU?</span>
          <div>
            <RadioButton
              label="Journalist"
              required={value === false}
              value={"Journalist" === value}
              onChange={() => handleChange("Journalist")}
            />
          </div>
          <div>
            <RadioButton
              label="Collector"
              required={value === false}
              value={"Collector" === value}
              onChange={() => handleChange("Collector")}
            />
          </div>
        </div>
        <br />
        <div className="w-full border-b border-white"></div>
        <div className="w-full py-4 text-small">
          <label>
            <input className="mr-2" type="checkbox" required/>
            <span>I hereby agree to receive newsletters from Immortal Faces NFT.</span>
          </label>
        </div>
        <button
          className="hover:border-gray-400 hover:text-gray-400 w-full py-2 border-white border"
          onClick={submit}>
          {status === "sending" ? 'sending...' : 'submit'}
        </button>
      </div>
    </form>
  );
};

const MailchimpSubscribeWrapper = () => {
  return (
    <div className="mx-auto" style={{maxWidth: '300px'}}>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <div>
            <CustomForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)} />
            {status === "sending" && <div className="text-blue-400 text-xs mt-4">sending...</div>}
            {status === "error" && <div className="text-red-400 text-xs mt-4" dangerouslySetInnerHTML={{__html: message}}/>}
            {status === "success" && <div className="text-green-400 text-xs mt-4">Subscribed!</div>}
          </div>
        )}
      />
    </div>
  )
}

export default MailchimpSubscribeWrapper;
