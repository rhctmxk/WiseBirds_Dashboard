import CampaignList from '@/components/campaign/CampaignList';

export default function CampaignPage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">캠페인 목록</h1>
            <CampaignList />
        </div>
    );
}
