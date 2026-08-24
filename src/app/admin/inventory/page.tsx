'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Plus, Package, Tag, Image as ImageIcon, 
  CheckCircle, Star, Edit, Trash2, X
} from 'lucide-react';

export default function InventoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState('');
  
  // 🚀 NAYA: Pata karne ke liye ki hum Add kar rahe hain ya Edit
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialForm = {
    name: '',
    description: '',
    price: '',
    mrp: '',
    images: '', 
    category: 'Custom Dress',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    isFeatured: false,
  };
  const [formData, setFormData] = useState<any>(initialForm);
  const [isSaving, setIsSaving] = useState(false);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'];

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    else if (status === 'authenticated') {
      const role = (session?.user as any)?.role;
      if (role !== 'admin' && role !== 'superadmin') router.push('/');
      else fetchProducts();
    }
  }, [status, router, session]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (res.ok && data.success) setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products', error);
    }
    setLoading(false);
  };

  const handleSizeToggle = (size: string) => {
    setFormData((prev: any) => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter((s: string) => s !== size) 
        : [...prev.sizes, size]
    }));
  };

  // 🚀 NAYA: Edit Button Click Logic
  const handleEdit = (product: any) => {
    setFormData({
      ...product,
      images: product.images[0], // Array se wapas string banaya form ke liye
      mrp: product.mrp || ''
    });
    setEditingId(product._id);
    setIsModalOpen(true);
  };

  // 🚀 NAYA: Delete Button Click Logic
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this dress?")) return;
    
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setToast('🗑️ Dress deleted successfully!');
        setTimeout(() => setToast(''), 3000);
        fetchProducts(); // List refresh
      }
    } catch (error) {
      alert("Failed to delete");
    }
  };

  // 🚀 UPDATE: Submit ab Add aur Edit dono handle karega
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const payload = {
      ...formData,
      price: Number(formData.price),
      mrp: formData.mrp ? Number(formData.mrp) : undefined,
      images: [formData.images]
    };

    // Agar editingId hai, toh PUT method use karo, warna POST (New Add)
    const method = editingId ? 'PUT' : 'POST';
    if (editingId) payload._id = editingId; 

    try {
      const res = await fetch('/api/admin/products', {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setToast(editingId ? '✅ Dress updated successfully!' : '✅ New dress added!');
        setTimeout(() => setToast(''), 3000);
        
        // Modal close aur form reset
        setIsModalOpen(false);
        setFormData(initialForm);
        setEditingId(null);
        fetchProducts(); 
      }
    } catch (error) {
      alert('Something went wrong!');
    }
    setIsSaving(false);
  };

  const openNewModal = () => {
    setFormData(initialForm);
    setEditingId(null);
    setIsModalOpen(true);
  };

  if (loading || status === 'loading') {
    return <div className="min-h-screen bg-cream flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-900"></div></div>;
  }

  return (
    <div className="bg-cream min-h-screen pb-16 relative">
      
      {toast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-50 text-green-700 px-6 py-3 rounded-full shadow-lg border border-green-200 font-bold text-sm flex items-center gap-2 animate-in slide-in-from-top-5">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="bg-brand-900 text-cream py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 hover:bg-brand-800 rounded-full transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="font-serif text-2xl font-bold flex items-center gap-2">
                <Package size={24} /> Inventory Management
              </h1>
            </div>
          </div>
          <button 
            onClick={openNewModal}
            className="flex items-center gap-2 bg-cream text-brand-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors shadow-md"
          >
            <Plus size={18} /> Add New Dress
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {products.length === 0 ? (
          <div className="text-center py-12">No products yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                
                {/* 🚀 IMAGE FIX: object-cover ki jagah object-contain lagaya */}
                <div className="h-64 bg-gray-50 relative flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images[0]} alt={product.name} className="max-w-full max-h-full object-contain" />
                  
                  {!product.inStock && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Out of Stock</div>
                  )}
                  {product.isFeatured && (
                    <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                      <Star size={10} className="fill-yellow-900" /> Featured
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{product.category}</p>
                  <h3 className="font-bold text-charcoal text-sm mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-brand-900">₹{product.price}</span>
                    {product.mrp && <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>}
                  </div>
                  
                  {/* 🚀 ACTION BUTTONS FIX */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-2">
                    <span className="text-[10px] text-gray-500 font-medium">Sizes: {product.sizes.length}</span>
                    <div className="flex gap-4">
                      <button onClick={() => handleEdit(product)} className="text-gray-400 hover:text-brand-900 transition-colors"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(product._id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 py-8 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-auto animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-brand-900 flex items-center gap-2">
                {editingId ? <Edit size={24} /> : <Plus size={24} />} 
                {editingId ? 'Edit Dress' : 'Add New Dress'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 md:col-span-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">Dress Name *</label>
                  <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-md py-2.5 px-4 focus:outline-none focus:border-brand-900 bg-gray-50" />
                </div>

                <div className="space-y-4 md:col-span-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">Description *</label>
                  <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border border-gray-200 rounded-md py-2.5 px-4 focus:outline-none focus:border-brand-900 bg-gray-50" />
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1"><Tag size={14}/> Selling Price (₹) *</label>
                  <input required type="number" min="0" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border border-gray-200 rounded-md py-2.5 px-4 focus:outline-none focus:border-brand-900 bg-gray-50" />
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">Original MRP (₹)</label>
                  <input type="number" min="0" value={formData.mrp} onChange={(e) => setFormData({...formData, mrp: e.target.value})} className="w-full border border-gray-200 rounded-md py-2.5 px-4 focus:outline-none focus:border-brand-900 bg-gray-50" />
                </div>

                <div className="space-y-4 md:col-span-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-1"><ImageIcon size={14}/> Image URL *</label>
                  <input required type="url" value={formData.images} onChange={(e) => setFormData({...formData, images: e.target.value})} className="w-full border border-gray-200 rounded-md py-2.5 px-4 focus:outline-none focus:border-brand-900 bg-gray-50" />
                </div>

                <div className="space-y-4 md:col-span-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">Available Sizes</label>
                  <div className="flex flex-wrap gap-3">
                    {availableSizes.map(size => (
                      <button type="button" key={size} onClick={() => handleSizeToggle(size)} className={`px-4 py-2 text-xs font-bold rounded-md border transition-colors ${formData.sizes.includes(size) ? 'bg-brand-900 text-cream border-brand-900' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-900'}`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="instock" checked={formData.inStock} onChange={(e) => setFormData({...formData, inStock: e.target.checked})} className="w-4 h-4 accent-brand-900" />
                  <label htmlFor="instock" className="text-sm font-bold text-charcoal cursor-pointer">Item is in Stock</label>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="featured" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 accent-yellow-500" />
                  <label htmlFor="featured" className="text-sm font-bold text-charcoal cursor-pointer">Mark as Featured</label>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" disabled={isSaving} className="px-6 py-2.5 rounded-lg bg-brand-900 text-cream font-bold text-sm hover:bg-brand-800 transition-colors shadow-md flex items-center gap-2 disabled:opacity-70">
                  {isSaving ? 'Saving...' : <><CheckCircle size={18} /> {editingId ? 'Update Dress' : 'Save Dress'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}