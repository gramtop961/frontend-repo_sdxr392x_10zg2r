import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Download, Send } from 'lucide-react';

// Predefined rate entries (subset for demo; can be extended or fetched from backend later)
const RATE_ENTRIES = [
  { department: 'Furniture', room: 'Master Bedroom', particular: 'King Size Bed', rate: 1650 },
  { department: 'Furniture', room: 'Master Bedroom', particular: 'Cushion Headboard', rate: 800 },
  { department: 'Furniture', room: 'Master Bedroom', particular: 'Side Table', rate: 1650 },
  { department: 'Furniture', room: 'Master Bedroom', particular: 'Dressing Cabinet with Mirror', rate: 1650 },
  { department: 'Furniture', room: 'Master Bedroom', particular: 'Wardrobe (Sliding/Door)', rate: 1850 },
  { department: 'Furniture', room: 'Master Bedroom', particular: 'Loft', rate: 1650 },
  { department: 'Furniture', room: 'Kids Bedroom', particular: 'Queen Size Bed', rate: 1650 },
  { department: 'Furniture', room: 'Kids Bedroom', particular: 'Cushion Headboard', rate: 800 },
  { department: 'Furniture', room: 'Kids Bedroom', particular: 'Side Table', rate: 1650 },
  { department: 'Furniture', room: 'Kids Bedroom', particular: 'Dressing Cabinet with Mirror', rate: 1650 },
  { department: 'Furniture', room: 'Kids Bedroom', particular: 'Wardrobe (Sliding/Door)', rate: 1850 },
  { department: 'Furniture', room: 'Kids Bedroom', particular: 'Loft', rate: 1650 },
  { department: 'Furniture', room: 'Kids Bedroom', particular: 'Dressing Mirror', rate: 1650 },
  { department: 'Living Room', room: 'Living Room', particular: 'T.V Unit', rate: 1450 },
  { department: 'Living Room', room: 'Living Room', particular: 'Sofa with lounger', rate: 2250 },
  { department: 'Living Room', room: 'Living Room', particular: 'Centre Table', rate: 2250 },
  { department: 'Living Room', room: 'Living Room', particular: 'Decorative Storage Cabinet', rate: 1650 },
  { department: 'Entrance', room: 'Entrance', particular: 'Safety Door + wall designing', rate: 1550 },
  { department: 'Entrance', room: 'Entrance', particular: 'Shoe Rack', rate: 1650 },
  { department: 'Entrance', room: 'Entrance', particular: 'Shoe-rack seating', rate: 1650 },
  { department: 'Dry Balcony', room: 'Dry Balcony', particular: 'Storage Cabinet', rate: 1650 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'Lower Case Frame', rate: 261 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'S.S Trolley', rate: 3000 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'S.S Trolley (Soft Close Channel)', rate: 2000 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'Crockery Unit', rate: 1650 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'Loft', rate: 1650 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'Lower Case Shutter (Profile Handle)', rate: 800 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'Crockery Unit Shutters (Handleless)', rate: 800 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'Loft Shutters (Handleless)', rate: 800 },
  { department: 'Modular Kitchen', room: 'Kitchen', particular: 'Profile Handle', rate: 5000 },
  { department: 'Civil Work', room: 'Kitchen', particular: 'Granite Extension', rate: 2000 },
  { department: 'Civil Work', room: 'Dry Balcony', particular: 'Granite Installation + Sink', rate: 2400 },
  { department: 'False Ceiling', room: 'Bedroom', particular: 'Single/Double layer with profile light', rate: 120 },
  { department: 'Electrical Work', room: 'Bedroom', particular: 'Panel light +LED +Profile Light', rate: 1500 },
  { department: 'Painting', room: 'Full House', particular: 'Royale Emulsion Luxury (Double Coat)', rate: 28 },
  { department: 'Designing', room: 'Full House', particular: '2-D,Schematic Views & Rendered Images', rate: 6500 },
];

const unique = (arr) => Array.from(new Set(arr));

export default function Estimator() {
  const [rows, setRows] = useState([
    { department: '', room: '', particular: '', length: '', breadth: '', qty: 1 },
  ]);
  const [gst, setGst] = useState(18);
  const [discount, setDiscount] = useState(0);

  const departments = useMemo(
    () => unique(RATE_ENTRIES.map((r) => r.department)),
    []
  );
  const rooms = useMemo(
    () => unique(RATE_ENTRIES.filter((r) => !rows[0].department || r.department === rows[0].department).map((r) => r.room)),
    [rows]
  );
  const particulars = useMemo(
    () => unique(
      RATE_ENTRIES.filter(
        (r) => (!rows[0].department || r.department === rows[0].department) && (!rows[0].room || r.room === rows[0].room)
      ).map((r) => r.particular)
    ),
    [rows]
  );

  const getRate = (department, room, particular) =>
    RATE_ENTRIES.find((r) => r.department === department && r.room === room && r.particular === particular)?.rate || 0;

  const computeRow = (row) => {
    const l = parseFloat(row.length || 0);
    const b = parseFloat(row.breadth || 0);
    const qty = parseInt(row.qty || 1, 10);
    const area = (l * b) / 144; // convert inch^2 to sq.ft (assuming inputs in inches)
    const rate = getRate(row.department, row.room, row.particular);
    const amount = area * rate * qty;
    return { area, rate, amount };
  };

  const totals = rows.reduce(
    (acc, r) => {
      const { amount } = computeRow(r);
      acc.subtotal += amount;
      return acc;
    },
    { subtotal: 0 }
  );

  const discounted = Math.max(totals.subtotal - discount, 0);
  const gstAmount = (discounted * gst) / 100;
  const grandTotal = discounted + gstAmount;

  const addRow = () => setRows((prev) => [...prev, { department: '', room: '', particular: '', length: '', breadth: '', qty: 1 }]);
  const updateRow = (i, patch) => setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const removeRow = (i) => setRows((prev) => prev.filter((_, idx) => idx !== i));

  const whatsappQuote = () => {
    const lines = rows.map((r) => {
      const { area, rate, amount } = computeRow(r);
      return `${r.department} | ${r.room} | ${r.particular} | Area: ${area.toFixed(2)} sq.ft | Rate: ₹${rate}/sq.ft | Amount: ₹${amount.toFixed(2)}`;
    });
    const text = `Quote Request\n${lines.join('\n')}\nSubtotal: ₹${totals.subtotal.toFixed(2)}\nDiscount: ₹${discount.toFixed(2)}\nGST(${gst}%): ₹${gstAmount.toFixed(2)}\nTotal: ₹${grandTotal.toFixed(2)}`;
    const url = `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="estimator" className="relative bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-[#1e1e1e] md:text-4xl dark:text-white">Estimated Bill Calculator</h2>
            <p className="mt-2 max-w-2xl text-neutral-600 dark:text-neutral-300">Select particulars, enter dimensions, and view totals instantly.</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10 bg-[#f8f8f8] shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="hidden grid-cols-12 gap-4 border-b border-black/10 px-4 py-3 text-xs font-medium text-neutral-500 dark:border-white/10 md:grid">
            <div className="col-span-2">Department</div>
            <div className="col-span-2">Room</div>
            <div className="col-span-2">Particulars</div>
            <div>Length (in)</div>
            <div>Breadth/Height (in)</div>
            <div>Qty</div>
            <div>Area (sq.ft)</div>
            <div>Rate</div>
            <div>Amount</div>
          </div>

          {rows.map((row, i) => {
            const { area, rate, amount } = computeRow(row);
            return (
              <div key={i} className="grid grid-cols-1 gap-4 border-b border-black/10 px-4 py-4 last:border-b-0 dark:border-white/10 md:grid-cols-12 md:items-center">
                <div className="md:col-span-2">
                  <select value={row.department} onChange={(e) => updateRow(i, { department: e.target.value, room: '', particular: '' })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent dark:text-white">
                    <option value="">Select</option>
                    {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <select value={row.room} onChange={(e) => updateRow(i, { room: e.target.value, particular: '' })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent dark:text-white">
                    <option value="">Select</option>
                    {rooms.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <select value={row.particular} onChange={(e) => updateRow(i, { particular: e.target.value })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent dark:text-white">
                    <option value="">Select</option>
                    {particulars.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <input type="number" value={row.length} onChange={(e) => updateRow(i, { length: e.target.value })} placeholder="inches" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent dark:text-white" />
                </div>
                <div>
                  <input type="number" value={row.breadth} onChange={(e) => updateRow(i, { breadth: e.target.value })} placeholder="inches" className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent dark:text-white" />
                </div>
                <div>
                  <input type="number" min={1} value={row.qty} onChange={(e) => updateRow(i, { qty: e.target.value })} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-transparent dark:text-white" />
                </div>
                <div className="text-sm text-[#1e1e1e] dark:text-neutral-200">{area ? area.toFixed(2) : '-'}</div>
                <div className="text-sm text-[#1e1e1e] dark:text-neutral-200">{rate ? `₹${rate}` : '-'}</div>
                <div className="text-sm font-semibold text-[#1e1e1e] dark:text-white">{amount ? `₹${amount.toFixed(2)}` : '-'}</div>
                <div className="md:col-span-12">
                  <button onClick={() => removeRow(i)} className="text-xs text-red-600 hover:underline">Remove</button>
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <button onClick={addRow} className="rounded-full bg-[#1e1e1e] px-4 py-2 text-sm text-white hover:opacity-90 dark:bg-white dark:text-black">Add Item</button>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">GST %
                <input type="number" value={gst} onChange={(e) => setGst(parseFloat(e.target.value || 0))} className="w-20 rounded-lg border border-black/10 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-transparent dark:text-white" />
              </label>
              <label className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">Discount ₹
                <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value || 0))} className="w-24 rounded-lg border border-black/10 bg-white px-2 py-1 text-sm dark:border-white/10 dark:bg-transparent dark:text-white" />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-6 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">Subtotal</div>
              <div className="text-xl font-semibold text-[#1e1e1e] dark:text-white">₹{totals.subtotal.toFixed(2)}</div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">Discount</div>
              <div className="text-xl font-semibold text-[#1e1e1e] dark:text-white">- ₹{discount.toFixed(2)}</div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">GST ({gst}%)</div>
              <div className="text-xl font-semibold text-[#1e1e1e] dark:text-white">₹{gstAmount.toFixed(2)}</div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
              <div className="text-sm text-neutral-600 dark:text-neutral-300">Total</div>
              <div className="text-2xl font-bold text-[#d4af37]">₹{grandTotal.toFixed(2)}</div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-[#1e1e1e] px-4 py-2 text-sm text-white hover:opacity-90 dark:bg-white dark:text-black">
                <Download className="h-4 w-4" /> Download PDF
              </button>
              <button onClick={whatsappQuote} className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm text-[#1e1e1e] hover:bg-black hover:text-white dark:border-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black">
                <Send className="h-4 w-4" /> Send to WhatsApp
              </button>
            </div>
          </motion.div>
          <div className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-6 dark:border-white/10 dark:bg-white/5 md:col-span-2">
            <h4 className="mb-3 text-sm font-medium text-neutral-600 dark:text-neutral-300">Breakup</h4>
            <div className="max-h-60 overflow-auto rounded-xl border border-black/10 dark:border-white/10">
              <table className="min-w-full text-sm">
                <thead className="bg-white text-left text-neutral-500 dark:bg-white/10">
                  <tr>
                    <th className="px-3 py-2">Item</th>
                    <th className="px-3 py-2">Area</th>
                    <th className="px-3 py-2">Rate</th>
                    <th className="px-3 py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, idx) => {
                    const { area, rate, amount } = computeRow(r);
                    return (
                      <tr key={idx} className="odd:bg-white/60 dark:odd:bg-white/5">
                        <td className="px-3 py-2">{r.particular || '-'}</td>
                        <td className="px-3 py-2">{area ? area.toFixed(2) : '-'}</td>
                        <td className="px-3 py-2">{rate ? `₹${rate}` : '-'}</td>
                        <td className="px-3 py-2 font-medium">{amount ? `₹${amount.toFixed(2)}` : '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
