"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Mail, Calendar, Loader2 } from "lucide-react"
import type { SanityPressRelease, SanityMediaKit, SanityCompanyInfo } from "@/lib/sanity"

interface PressRelease {
  _id: string
  title: string
  excerpt: string
  publishedAt: string
  externalLink?: string
}

interface MediaKitItem {
  _id: string
  name: string
  description: string
  file: {
    asset: {
      url: string
    }
  }
  fileType: string
  fileSize: number
}

interface CompanyInfo {
  _id: string
  title: string
  founded: number
  headquarters: string
  industry: string
  fundingStage: string
  employees: string
  mediaContact: {
    name: string
    title: string
    email: string
    phone?: string
  }
}

export function Press() {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([])
  const [mediaKit, setMediaKit] = useState<MediaKitItem[]>([])
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch press data from Sanity CMS
  useEffect(() => {
    const fetchPressData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/press')
        if (!response.ok) {
          throw new Error('Failed to fetch press data')
        }
        
        const data = await response.json()
        if (data.success) {
          setPressReleases(data.pressReleases || [])
          setMediaKit(data.mediaKit || [])
          setCompanyInfo(data.companyInfo || null)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (err) {
        console.error('Error fetching press data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch press data')
      } finally {
        setLoading(false)
      }
    }

    fetchPressData()
  }, [])

  const handleDownload = (item: MediaKitItem) => {
    // Create a temporary link to download the file
    const link = document.createElement('a')
    link.href = item.file.asset.url
    link.download = item.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (error) {
    return (
      <section className="section-padding bg-base">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-headline text-text mb-6">Press & Media</h2>
            <p className="text-xl text-text-secondary mb-8">
              Latest news, press releases, and media resources for journalists and content creators covering LandLedger.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-600 mb-4">Unable to load press content</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-base">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-headline text-text mb-6">Press & Media</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Latest news, press releases, and media resources for journalists and content creators covering LandLedger.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-text-secondary">Loading press content...</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Press Releases */}
              <div>
                <h3 className="text-2xl font-semibold text-text mb-8">Latest Press Releases</h3>
                {pressReleases.length > 0 ? (
                  <>
                    <div className="space-y-6">
                      {pressReleases.slice(0, 3).map((release) => (
                        <Card key={release._id} className="p-6 bg-base border-text-secondary/20 card-hover">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                              <Calendar className="w-4 h-4" />
                              {formatDate(release.publishedAt)}
                            </div>
                            {release.externalLink && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary hover:text-primary/80"
                                onClick={() => window.open(release.externalLink, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-text mb-3">{release.title}</h4>
                          <p className="text-text-secondary text-sm leading-relaxed">{release.excerpt}</p>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Button
                        variant="outline"
                        className="w-full border-text-secondary/20 text-text hover:bg-text-secondary/10 bg-transparent"
                      >
                        View All Press Releases
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-text-secondary">No press releases available yet.</p>
                  </div>
                )}
              </div>

              {/* Media Kit */}
              <div>
                <h3 className="text-2xl font-semibold text-text mb-8">Media Kit</h3>
                {mediaKit.length > 0 ? (
                  <>
                    <div className="space-y-4 mb-8">
                      {mediaKit.map((item) => (
                        <Card key={item._id} className="p-4 bg-base border-text-secondary/20 card-hover">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-text mb-1">{item.name}</h4>
                              <p className="text-sm text-text-secondary mb-2">{item.description}</p>
                              <div className="flex items-center gap-4 text-xs text-text-secondary">
                                <span>{item.fileType}</span>
                                <span>{item.fileSize} MB</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(item)}
                              className="text-primary hover:text-primary/80"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 mb-8">
                    <p className="text-text-secondary">Media kit resources coming soon.</p>
                  </div>
                )}

                {/* Media Contact */}
                {companyInfo?.mediaContact && (
                  <Card className="p-6 bg-primary/10 border-primary/20">
                    <h4 className="text-lg font-semibold text-text mb-4">Media Contact</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-text">{companyInfo.mediaContact.name}</p>
                          <p className="text-sm text-text-secondary">{companyInfo.mediaContact.title}</p>
                        </div>
                      </div>
                      <div className="text-sm text-text-secondary">
                        <p>{companyInfo.mediaContact.email}</p>
                        {companyInfo.mediaContact.phone && (
                          <p>{companyInfo.mediaContact.phone}</p>
                        )}
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-primary hover:bg-primary/90 text-base"
                      onClick={() => window.open(`mailto:${companyInfo.mediaContact.email}`)}
                    >
                      Contact Media Team
                    </Button>
                  </Card>
                )}

                {/* Quick Facts */}
                {companyInfo && (
                  <Card className="p-6 bg-base border-text-secondary/20 mt-6">
                    <h4 className="text-lg font-semibold text-text mb-4">Quick Facts</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Founded:</span>
                        <span className="text-text">{companyInfo.founded}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Headquarters:</span>
                        <span className="text-text">{companyInfo.headquarters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Industry:</span>
                        <span className="text-text">{companyInfo.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Funding Stage:</span>
                        <span className="text-text">{companyInfo.fundingStage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Employees:</span>
                        <span className="text-text">{companyInfo.employees}</span>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
