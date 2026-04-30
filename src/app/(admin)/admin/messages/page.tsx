import connectDB from "@/lib/db";
import Message from "@/lib/models/Message";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  await connectDB();
  const messages = await Message.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-serif tracking-wide">Inquiries & Messages</h1>
        <p className="text-gray-500">Manage all customer inquiries submitted through the contact form.</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white p-10 border border-gray-100 text-center text-gray-500">
          No messages found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map((msg: any) => (
            <div key={msg._id.toString()} className="bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 p-6 md:w-1/3 flex flex-col gap-4">
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Date</div>
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(msg.createdAt).toLocaleString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Contact</div>
                  <div className="text-base font-bold text-gray-900">{msg.name}</div>
                  <div className="text-sm text-gray-600">{msg.company}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Details</div>
                  <div className="text-sm text-gray-800"><a href={`mailto:${msg.email}`} className="text-[#B8941F] hover:underline">{msg.email}</a></div>
                  <div className="text-sm text-gray-800"><a href={`tel:${msg.phone}`} className="text-[#B8941F] hover:underline">{msg.phone}</a></div>
                </div>
              </div>
              <div className="p-6 md:w-2/3 flex flex-col">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Requirement / Message</div>
                <div className="text-gray-700 whitespace-pre-wrap leading-relaxed font-serif">
                  {msg.requirement}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
