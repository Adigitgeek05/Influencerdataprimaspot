"use client"

import type React from "react"

import { useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  onSearch: (username: string) => Promise<void>
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [username, setUsername] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      await onSearch(username.trim())
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for an influencer (e.g., virat.kohli, cristiano, selenagomez)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 pr-4 py-3 text-base bg-card/50 border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>

      {/* Search suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Try:</span>
        {["virat.kohli", "cristiano", "selenagomez", "therock"].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setUsername(suggestion)}
            className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-md transition-colors"
            disabled={isLoading}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
