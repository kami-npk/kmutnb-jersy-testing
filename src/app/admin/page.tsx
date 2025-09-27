"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SupabaseService from '../supabase/supabase'

// types
type OrderItem = {
  amount: number;
  size?: string;
  color?: string;
  number?: string;
  nametag?: string;
};

type Order = {
  id: string;
  name: string;
  order_items: OrderItem[];
  contact: string;
  shipping_address?: string | null;
  slip_img_url?: string | null;
  status?: string;
  created_at?: string;
};

// ==========================
// helper functions
// ==========================
function getSalePricePerUnit(units: number) {
  if (units < 5) return 339;
  return 325;
}

function getCostPricePerUnit(units: number) {
  if (units >= 100) return 220;
  if (units >= 50) return 240;
  if (units >= 10) return 260;
  return 260;
}

// ==========================
// fetch
// ==========================
async function fetchData(): Promise<Order[]> {
  const supabase = SupabaseService.getClient();
  const { data, error } = await supabase.from("orders").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  // parse order_items jsonb → array
  return (data ?? []).map((row) => ({
    ...row,
    order_items: Array.isArray(row.order_items) ? row.order_items : [],
  })) as Order[];
}

// ==========================
// component
// ==========================
export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openOrders, setOpenOrders] = useState<string[]>([]);

  useEffect(() => {
    fetchData().then(setOrders);
  }, []);

  const toggleOrder = (id: string) => {
    setOpenOrders((prev) =>
      prev.includes(id) ? prev.filter((oid) => oid !== id) : [...prev, id]
    );
  };

  // aggregate
  const totalUnits = orders.reduce(
    (sum, o) => sum + o.order_items.reduce((s, it) => s + (it.amount ?? 0), 0),
    0
  );

  const totalRevenue = orders.reduce((sum, o) => {
    const units = o.order_items.reduce((s, it) => s + (it.amount ?? 0), 0);
    const sellPrice = getSalePricePerUnit(units);
    return sum + units * sellPrice;
  }, 0);

  const totalCost = orders.reduce((sum, o) => {
    const units = o.order_items.reduce((s, it) => s + (it.amount ?? 0), 0);
    const costPrice = getCostPricePerUnit(units);
    return sum + units * costPrice;
  }, 0);

  const totalProfit = totalRevenue - totalCost;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin — Orders</h1>

      {/* summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded">
          <div className="text-sm text-gray-500">Orders</div>
          <div className="text-2xl font-semibold">{orders.length}</div>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <div className="text-sm text-gray-500">Total Units</div>
          <div className="text-2xl font-semibold">{totalUnits}</div>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="text-2xl font-semibold">฿{totalRevenue}</div>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <div className="text-sm text-gray-500">Profit</div>
          <div className="text-2xl font-semibold">฿{totalProfit}</div>
        </div>
      </div>

      {/* รายการแต่ละ order */}
      <div className="space-y-4">
        {orders.map((o) => {
          const units = o.order_items.reduce(
            (s, it) => s + (it.amount ?? 0),
            0
          );
          const salePrice = getSalePricePerUnit(units);
          const costPrice = getCostPricePerUnit(units);
          const revenue = units * salePrice;
          const cost = units * costPrice;
          const profit = revenue - cost;

          const isOpen = openOrders.includes(o.id);

          return (
            <div key={o.id} className="bg-white p-4 shadow rounded">
              {/* header ข้อมูลออเดอร์ */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{o.name}</div>
                  <div className="text-sm text-gray-500">{o.contact}</div>
                  <div className="text-xs text-gray-400">
                    Units: {units} | Revenue: ฿{revenue} | Profit: ฿{profit}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {o.slip_img_url && (
                    <a
                      href={o.slip_img_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      Slip
                    </a>
                  )}
                  <button
                    onClick={() => toggleOrder(o.id)}
                    className="flex items-center text-sm text-gray-600 hover:text-black"
                  >
                    {isOpen ? "" : ""}
                    {isOpen ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
                  </button>
                </div>
              </div>

              {/* รายละเอียดเสื้อแต่ละ item */}
              {isOpen && (
                <div className="mt-3 space-y-2">
                  {o.order_items.map((it, idx) => (
                    <div key={idx} className="bg-white p-4 shadow rounded">
                      <div>
                        <span className="font-medium">amount:</span> {it.amount}
                      </div>
                      <div>
                        <span className="font-medium">Size:</span> {it.size}
                      </div>
                      <div>
                        <span className="font-medium">Color:</span> {it.color}
                      </div>
                      <div>
                        <span className="font-medium">nametag:</span> {it.nametag}
                      </div>
                      <div>
                        <span className="font-medium">number:</span> {it.number}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
