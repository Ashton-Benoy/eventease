import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminCreateEvent(){
  const nav = useNavigate();
  const [form, setForm] = useState({title:'', description:'', startAt:'', endAt:'', location:'', tickets: [{name:'General', priceCents:1000, quantity:100}]});

  function updateTicket(i, key, val){
    const t = [...form.tickets];
    t[i][key]= (key==='priceCents'||key==='quantity') ? Number(val) : val;
    setForm({...form, tickets: t});
  }

  async function submit(e){
    e.preventDefault();
    const data = { ...form, startAt: new Date(form.startAt), endAt: new Date(form.endAt) };
    const ev = await API.createEvent(data);
    alert('Created');
    nav(`/dashboard`);
  }

  return (
    <form onSubmit={submit} className="max-w-2xl mx-auto space-y-4">
      <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Title" />
      <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" />
      <input type="datetime-local" value={form.startAt} onChange={e=>setForm({...form, startAt:e.target.value})}/>
      <input type="datetime-local" value={form.endAt} onChange={e=>setForm({...form, endAt:e.target.value})}/>
      <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Location" />
      <h4>Tickets</h4>
      {form.tickets.map((t,i)=>(
        <div key={i}>
          <input value={t.name} onChange={e=>updateTicket(i,'name',e.target.value)} placeholder="Ticket name" />
          <input value={t.priceCents} onChange={e=>updateTicket(i,'priceCents',e.target.value)} placeholder="Price cents" type="number"/>
          <input value={t.quantity} onChange={e=>updateTicket(i,'quantity',e.target.value)} placeholder="Quantity" type="number"/>
        </div>
      ))}
      <button type="submit">Create Event</button>
    </form>
  );
}

